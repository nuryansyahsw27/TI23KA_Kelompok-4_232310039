import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ImageBackground, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { topInset } from './responsive';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [username, setUsername] = useState('');
  const [lastLogoutTime, setLastLogoutTime] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedLogoutTime = await AsyncStorage.getItem('lastLogoutTime');
        
        if (!storedUsername) {
          navigation.navigate('LoginScreen');
        } else {
          setUsername(storedUsername);
        }
        
        if (storedLogoutTime) {
          setLastLogoutTime(parseInt(storedLogoutTime));
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        navigation.navigate('LoginScreen');
      }
    };

    checkLoginStatus();
  }, [navigation]);

  const handleLogout = async () => {
    try {
      const currentTime = Date.now();
      await AsyncStorage.setItem('lastLogoutTime', currentTime.toString());
      
      await AsyncStorage.removeItem('username');
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
      
      Alert.alert(
        'Logout Berhasil',
        'Anda tidak dapat login kembali selama beberapa waktu. Silakan coba lagi nanti.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <ImageBackground source={require('../assets/botback.jpg')} style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image 
          source={require('../assets/Profile.webp')} 
          style={styles.avatar} 
        />
      </View>

      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>{username || 'User'}</Text>
        </View>
        
        <View style={styles.menuWrapper}>
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>History</Text>
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => navigation.navigate('HistoryScreen')}
            >
              <Text style={styles.menuText}>History</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Others</Text>
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={handleLogout}
            >
              <Text style={[styles.menuText, styles.logoutText]}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      
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
          onPress={() => navigation.navigate('ProfileScreen')}
        >
          <Icon name="person" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  paddingTop: topInset,
},
  avatarWrapper: {
    position: 'absolute',
    top: 125,
    left: '50%',
    transform: [{ translateX: -60 }],
    zIndex: 1,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    marginTop: 170,
    marginBottom: 330,
    marginRight: 10,
    marginLeft: 10,
  },
  header: {
    marginTop: 40,
    alignItems: 'center',
    marginVertical: 30,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  menuWrapper: {
    marginTop: 20,
  },
  menuSection: {
    marginBottom: 25,
    marginLeft: 15,
    paddingBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  menuText: {
    fontSize: 18,
    color: '#333',
  },
  logoutText: {
    color: '#e74c3c',
  },
  arrow: {
    fontSize: 24,
    color: '#999',
    marginRight: 10,
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
});

export default Profile;