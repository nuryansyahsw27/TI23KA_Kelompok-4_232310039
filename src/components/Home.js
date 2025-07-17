import React, { useEffect, useState } from 'react';
import {
  View, 
  Text, 
  ScrollView, 
  ActivityIndicator, 
  StyleSheet, 
  Image,
  TouchableOpacity, 
  ImageBackground, 
  Platform, 
  StatusBar,
  Animated
} from 'react-native';
import axios from 'axios';
import { topInset } from './responsive';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const Home = ({ navigation }) => {
  const route = useRoute();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentSessions, setRecentSessions] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  const isFocused = useIsFocused();
  const [messages, setMessages] = useState([]); 

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        const userEmail = route.params?.email || await AsyncStorage.getItem('email');
        
        if (!userEmail) {
          setError('User not logged in');
          setLoading(false);
          return;
        }
        
        setEmail(userEmail);
        
        const response = await axios.get('http://192.168.100.13/CRMChatbot/getUserByEmail.php', {
          params: { email: userEmail },
        });

        if (response.data.success) {
          setUsername(response.data.username);
          await AsyncStorage.setItem('username', response.data.username);
        } else {
          throw new Error('Failed to get user data');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    const fetchRecentSessions = async () => {
      try {
        const savedUsername = await AsyncStorage.getItem('username');
        if (savedUsername) {
          const response = await axios.get('http://192.168.100.13/CRMChatbot/chatHis.php', {
            params: { 
              username: savedUsername, 
              limit: 200, 
              show_all: 1 
            },
            timeout: 5000
          });

          if (response.data?.status === 'success') {
            const groupedSessions = groupMessagesBySession(response.data.data.messages);
        
            setRecentSessions(groupedSessions.slice(-2));          }
        }
      } catch (error) {
        console.error('Failed to fetch recent sessions:', error);
      }
    };

    if (isFocused) {
      fetchUserData();
      fetchRecentSessions();
    }

    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex === 1 ? 0 : prevIndex + 1));
      triggerFadeAnimation();
    }, 10000);

    return () => clearInterval(interval);
  }, [isFocused, route.params?.email]);

  const triggerFadeAnimation = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

const handleAsk = (question) => {
  console.log("Pertanyaan yang dikirim: ", question); 
if (question && typeof question === 'string') {
  navigation.navigate('ChatbotScreen', { message: question });
}
};

  return (
    <ImageBackground source={require('../assets/botback.jpg')} style={styles.background}>
      <StatusBar barStyle="light-content" backgroundColor="#6A1B9A" />
      
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              source={require('../assets/LOGO_IBIK.webp')}
              style={styles.logoIBIK}
            />
            <Text style={styles.chatbotTitle}>Chatbot</Text>
            <Image
              source={require('../assets/Logo-Simbol-Diktisaintek-Berdampak.webp')}
              style={styles.logo}
            />
          </View>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#6A1B9A" style={styles.loader} />
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.retryButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.greetingContainer}>
                <Text style={styles.greeting}>Hello, {username || 'Guest'}</Text>
                <Text style={styles.subheading}>What do you want to ask today?</Text>
              </View>

              <View style={styles.banner}>
                <Image
                  source={currentBannerIndex === 0 ? require('../assets/lms.png') : require('../assets/regisibik.png')}
                  style={styles.bannerImage}
                  resizeMode="cover"
                />
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>FAQ</Text>
                <View style={styles.item}>
                  <Text style={styles.itemText}>Syarat Pendaftaran</Text>
                  <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => handleAsk('syarat pendaftaran')}
                  >
                    <Text style={styles.buttonText}>Ask</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.item}>
                  <Text style={styles.itemText}>Biaya Pendaftaran</Text>
                  <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => handleAsk('biaya pendaftaran')}
                  >
                    <Text style={styles.buttonText}>Ask</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Random History Chat</Text>
                {recentSessions.length === 0 ? (
                  <Text style={styles.noSessionsText}>No recent chat sessions</Text>
                ) : (
                  recentSessions.map((session, index) => {
                    const firstMessage = session[0]?.message || '';
                    const date = session[0]?.created_at ? moment(session[0].created_at).format('DD MMM YYYY') : '';
                    
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.sessionItem}
                        onPress={() => navigation.navigate('ChatbotScreen', { 
                          session: session 
                        })}
                      >
                        <View style={styles.sessionInfo}>
                          <Text style={styles.sessionTitle}>Chat Sessions #{index + 1}</Text>
                          <Text style={styles.sessionPreview} numberOfLines={1}>
                            {firstMessage}
                          </Text>
                        </View>
                        <View style={styles.sessionMeta}>
                          <Text style={styles.sessionDate}>{date}</Text>
                          <Text style={styles.sessionCount}>{session.length} pesan</Text>
                        </View>
                        <Icon name="chevron-forward" size={20} color="#6A1B9A" />
                      </TouchableOpacity>
                    );
                  })
                )}
              </View>
            </>
          )}
        </ScrollView>

        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <Icon name="home" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => navigation.navigate('ChatbotScreen')}
          >
            <Icon name="chatbubble" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => navigation.navigate('ProfileScreen', { email: route.params?.email || '' })}
          >
            <Icon name="person" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
container: {
  flex: 1,
  paddingTop: topInset,
},
  header: {
    backgroundColor: '#6A1B9A',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoIBIK: {
    width: 40,
    height: 40,
  },
  chatbotTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  logo: {
    width: 40,
    height: 40,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  greetingContainer: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  subheading: {
    fontSize: 16,
    color: '#555',
  },
  banner: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 25,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#6A1B9A',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  sessionInfo: {
    flex: 1,
    marginRight: 10,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sessionPreview: {
    fontSize: 14,
    color: '#666',
  },
  sessionMeta: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  sessionDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  sessionCount: {
    fontSize: 12,
    color: '#6A1B9A',
  },
  noSessionsText: {
    textAlign: 'center',
    color: '#666',
    padding: 15,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#6A1B9A',
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 5,
  },
  navButton: {
    padding: 5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#6A1B9A',
    padding: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;