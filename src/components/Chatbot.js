import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { topInset } from '../responsive/responsive';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const Chatbot = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [isNewChat, setIsNewChat] = useState(false);
  const question = route.params?.message || ''; 

  const API_BASE_URL = 'http://192.168.100.13/CRMChatbot';
  const CHAT_API = `${API_BASE_URL}/chatbot.php`;

const initializeChat = async () => {
  try {
    const savedUsername = await AsyncStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);

      if (route.params?.isNewChat) {
        setIsNewChat(true);
        setMessages([]);
        return;
      }

      if (route.params?.session) {
        const sessionMessages = Array.isArray(route.params.session) 
          ? route.params.session 
          : [route.params.session];

        const formattedMessages = [];

        sessionMessages.forEach(msg => {
          if (msg.message) {
            formattedMessages.push({
              id: `user-${Date.now()}-${Math.random()}`, // Unique ID for user message
              text: msg.message,
              sender: 'user',
              time: moment(msg.created_at || new Date()).format('HH:mm')
            });
          }

          if (msg.response) {
            formattedMessages.push({
              id: `bot-${Date.now()}-${Math.random()}`, // Unique ID for bot response
              text: msg.response,
              sender: 'bot',
              time: moment(msg.created_at || new Date()).format('HH:mm')
            });
          }
        });

        setMessages(formattedMessages.filter(msg => msg.text));
      } 

      else if (route.params?.message) {
        const questionText = route.params.message;

        setMessages([{
          id: `user-${Date.now()}-${Math.random()}`,
          text: questionText,
          sender: 'user',
          time: moment().format('HH:mm')
        }]);

        const waitForUsername = setInterval(() => {
          if (username) {
            clearInterval(waitForUsername);
            handleSendMessage(questionText);
          }
        }, 100);
      }

      else {
        await loadMessages(savedUsername);

        const faqList = [
          '1. Biaya pendaftaran',
          '2. Syarat pendaftaran',
          '3. Jadwal pendaftaran',
          '4. Lokasi pendaftaran',
          '5. Proses pendaftaran',
          '6. Estimasi biaya masuk',
          '7. Jumlah fakultas',
          '8. Jumlah program studi',
          '9. Beasiswa',
          '10. Fasilitas kampus',
          '11. Keunggulan kampus',
          '12. Lokasi cabang',
          '13. Tagihan registrasi',
        ];

        const daftar = `Berikut daftar pertanyaan yang bisa kamu ajukan:\n${faqList.join('\n')}`;
        const autoBotInfo = {
          id: `bot-${Date.now()}-info`,
          text: `Berikut informasi pendaftaran:\n• Biaya: Rp 500.000\n• Syarat: KTP, Pas Foto, Ijazah\n• Jadwal: Hari kerja 08.00–15.00\n• Lokasi: Kampus ABC, Jalan XYZ\n• Formulir: Di website resmi\n• Estimasi biaya masuk: Rp 1.500.000`,
          sender: 'bot',
          time: moment().format('HH:mm'),
        };

        addSystemMessage(daftar);
      }
    }
  } catch (e) {
    console.error('Initialization error:', e);
    addSystemMessage('Gagal memulai chat baru');
  }
};

  useEffect(() => {
    initializeChat();

    return () => {
      setMessages([]);
    };
  }, [route.params]);

  const loadMessages = async (username) => {
    try {
      const response = await axios.get(CHAT_API, {
        params: { 
          username, 
          limit: 50
        },
        timeout: 5000
      });

      if (response.data?.status === 'success') {
        const formattedMessages = [];
        
        response.data.data.messages.forEach(msg => {
          if (msg.message) {
            formattedMessages.unshift({
              id: msg.id || `user-${Date.now()}-${Math.random()}`,
              text: msg.message,
              sender: 'user',
              time: moment(msg.created_at).format('HH:mm')
            });
          }
          
          if (msg.response) {
            formattedMessages.unshift({
              id: msg.id ? `${msg.id}-bot` : `bot-${Date.now()}-${Math.random()}`,
              text: msg.response,
              sender: 'bot',
              time: moment(msg.created_at).format('HH:mm')
            });
          }
        });

        setMessages(formattedMessages.filter(msg => msg.text));
      }
    } catch (e) {
      console.error('Failed to load messages:', e);
      addSystemMessage('Gagal memuat pesan sebelumnya');
    }
  };

  const addSystemMessage = (text) => {
    const systemMessage = {
      id: `system-${Date.now()}-${Math.random()}`,
      text,
      sender: 'system',
      time: moment().format('HH:mm')
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  const clearChat = () => {
    Alert.alert(
      'Bersihkan Chat',
      'Apakah Anda yakin ingin menghapus semua pesan pada tampilan ini? (Riwayat percakapan tetap tersimpan)',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          onPress: async () => {
            try {
              const response = await axios.delete(CHAT_API, {
                params: { username: username },
              });

              if (response.data.status === 'success') {
                setMessages([]);
                addSystemMessage('Percakapan telah direset pada tampilan ini');
              } else {
                Alert.alert('Error', 'Gagal menghapus pesan');
              }
            } catch (e) {
              console.error('Failed to clear chat:', e);
              Alert.alert('Error', 'Tidak dapat menghapus pesan. Coba lagi nanti.');
            }
          }
        }
      ]
    );
  };

  const handleSendMessage = async (quickMessage = null) => {
    const messageToSend = (quickMessage || message).trim();
    if (!messageToSend || !username) return;

    if (messageToSend.toLowerCase() === 'formulir pendaftaran') {

      navigation.navigate('FormulirScreen');
      return; 
    }

    const userMessage = {
        id: `user-${Date.now()}`,
        text: messageToSend,
        sender: 'user',
        time: moment().format('HH:mm'),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    console.log("Sending message: ", messageToSend);

    try {
        const response = await axios.post(CHAT_API, { username, message: messageToSend });
        console.log("API Response: ", response.data);  

        if (response.data?.status === 'success') {
            const botMessage = {
                id: `bot-${Date.now()}`,
                text: response.data.data.response,
                sender: 'bot',
                time: moment().format('HH:mm'),
            };
            setMessages(prev => [...prev, botMessage]);
        } else {
            console.error("Bot response failed:", response.data);
        }
    } catch (error) {
        console.error("Error sending message: ", error);
        addSystemMessage('Failed to send message');
    } finally {
        setIsLoading(false);
    }
};

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user'
          ? styles.userMessage
          : item.sender === 'system'
          ? styles.systemMessage
          : styles.botMessage,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.sender === 'user' && styles.userMessageText,
        ]}
      >
        {item.text}
      </Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      {['Syarat', 'Biaya', 'Jadwal'].map((text, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.quickButton, isLoading && styles.disabledButton]}
          onPress={() => handleSendMessage(`${text} pendaftaran`)}
          disabled={isLoading}
        >
          <Text style={styles.quickButtonText}>{text}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={[styles.quickButton, isLoading && styles.disabledButton]}
        onPress={() => {
          handleSendMessage('Formulir Pendaftaran'); 
        }}
        disabled={isLoading}
      >
        <Text style={styles.quickButtonText}>Formulir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground 
      source={require('../assets/botback.jpg')} 
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        style={styles.flex}
        keyboardVerticalOffset={60}>
          
        <View style={styles.chatWrapper}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
              <Icon name="arrow-back" size={24} color="#6A1B9A" />
            </TouchableOpacity>
            
            <View style={styles.headerCenter}>
              <Text style={styles.headerText}>Chat with Caspia</Text>
              <View style={styles.onlineStatus}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>Online</Text>
              </View>
            </View>
            
            <View style={styles.headerRight}>
              <TouchableOpacity 
                onPress={() => navigation.navigate('HistoryScreen')}
                style={styles.historyButton}
              >
                <Icon name="time-outline" size={24} color="#6A1B9A" />
              </TouchableOpacity>
              <TouchableOpacity onPress={clearChat}>
                <Icon name="trash-outline" size={24} color="#6A1B9A" />
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.chatContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.emptyChat}>Mulai percakapan baru dengan Caspia</Text>
            }
          />

          {renderQuickActions()}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Tulis pertanyaan Anda..."
              placeholderTextColor="#999"
              onSubmitEditing={() => handleSendMessage()}
              editable={!isLoading}
            />
            <TouchableOpacity
              style={[styles.sendButton, (!message.trim() || isLoading) && styles.disabledButton]}
              onPress={() => handleSendMessage()}
              disabled={!message.trim() || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Icon name="send" size={20} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  paddingTop: topInset,
},
  flex: {
    flex: 1,
  },
  chatWrapper: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginTop: Platform.OS === 'android' ? 50 : 30,
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A1B9A',
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  onlineText: {
    fontSize: 12,
    color: '#4CAF50',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyButton: {
    marginRight: 15,
  },
  chatContainer: {
    padding: 15,
    flexGrow: 1,
  },
  emptyChat: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontStyle: 'italic',
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6A1B9A',
    borderBottomRightRadius: 2,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 2,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  systemMessage: {
    alignSelf: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#eee',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#fff',
  },
  messageTime: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  quickButton: {
    backgroundColor: '#6A1B9A',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  quickButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6A1B9A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default Chatbot;
