import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

const API_BASE_URL = 'http://192.168.100.13/CRMChatbot';
const CHAT_API = `${API_BASE_URL}/chatHis.php`;

const History = () => {
  const navigation = useNavigation();
  const [sessions, setSessions] = useState([]);
  const [username, setUsername] = useState('');

useEffect(() => {
  const loadSessions = async () => {
    try {
      const savedUsername = await AsyncStorage.getItem('username');
      if (savedUsername) {
        setUsername(savedUsername);

        const response = await axios.get(CHAT_API, {
          params: {
            username: savedUsername,
            limit: 100,
            show_all: 1
          },
          timeout: 5000
        });

        if (response.data?.status === 'success') {
          const allMessages = response.data.data.messages;

          const oneDayAgo = moment().subtract(7, 'day');
          const messagesLast24h = allMessages.filter((msg) =>
            moment(msg.created_at).isAfter(oneDayAgo)
          );

          const groupedSessions = groupMessagesBySession(messagesLast24h);

          const limitedSessions = groupedSessions.slice(0);

          setSessions(limitedSessions);
        }
      }
    } catch (e) {
      console.error('Failed to load sessions:', e);
    }
  };

  loadSessions();
}, []);

  const groupMessagesBySession = (messages) => {
    if (!messages || messages.length === 0) return [];
    
    const sortedMessages = [...messages].sort((a, b) => 
      moment(a.created_at).diff(moment(b.created_at))
    );
    
    const sessions = [];
    let currentSession = [];
    let lastTimestamp = moment(sortedMessages[0].created_at);
    
    sortedMessages.forEach((msg) => {
      const currentTimestamp = moment(msg.created_at);
      const diffMinutes = lastTimestamp.diff(currentTimestamp, 'minutes');
      
      if (Math.abs(diffMinutes) > 1) {
        if (currentSession.length > 0) {
          sessions.push(currentSession);
        }
        currentSession = [];
      }
      
      currentSession.push(msg);
      lastTimestamp = currentTimestamp;
    });
    
    if (currentSession.length > 0) {
      sessions.push(currentSession);
    }
    
    return sessions;
  };

  const renderSession = ({ item, index }) => {
    const startTime = moment(item[0].created_at);
    const endTime = moment(item[item.length - 1].created_at);
    const firstMessage = item[0]?.message || '';
    
    return (
      <TouchableOpacity
        style={styles.sessionItem}
        onPress={() => navigation.navigate('ChatbotScreen', { 
          session: item 
        })}
      >
        <View style={styles.sessionContent}>
          <Text style={styles.sessionTitle}>Chat Session #{index + 1}</Text>
          <Text style={styles.sessionPreview} numberOfLines={1}>
            {firstMessage}
          </Text>
          <Text style={styles.sessionTime}>
            {startTime.format('DD MMM YYYY HH:mm')} - {endTime.format('HH:mm')}
          </Text>
        </View>
        <View style={styles.sessionMeta}>
          <Text style={styles.messageCount}>{item.length} pesan</Text>
          <Icon name="chevron-forward" size={20} color="#6A1B9A" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground 
      source={require('../assets/botback.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.chatWrapper}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Riwayat Percakapan</Text>
            <View style={{ width: 24 }} />
          </View>

          <FlatList
            data={sessions}
            renderItem={renderSession}
            keyExtractor={(item, index) => `session-${index}`}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Belum ada riwayat percakapan</Text>
            }
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  chatWrapper: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginTop: Platform.OS === 'android' ? 50 : 30,
    margin: 10,
    marginBottom: 50,
    borderRadius: 15,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    backgroundColor: '#6A1B9A',
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  sessionItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#6A1B9A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sessionContent: {
    flex: 1,
    marginRight: 10,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sessionPreview: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  sessionTime: {
    fontSize: 12,
    color: '#666',
  },
  sessionMeta: {
    alignItems: 'flex-end',
  },
  messageCount: {
    fontSize: 14,
    color: '#6A1B9A',
    marginBottom: 5,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
  },
});

export default History;