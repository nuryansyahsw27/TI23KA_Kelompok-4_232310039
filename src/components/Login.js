import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  ImageBackground, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Harap masukkan email dan password');
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.post(
        'http://192.168.100.13/CRMChatbot/login.php', 
        new URLSearchParams({
          email: email.trim(),
          password: password.trim()
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      );

      console.log('Response:', response.data);
      
      if (response.data.message === 'Login successful') {
        await AsyncStorage.setItem('email', email.trim());
        
        navigation.navigate('HomeScreen', { 
          email: email.trim()
        });
      } else {
        Alert.alert('Login Failed', response.data.message || 'Email or password wrong');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert(
        'Error', 
        error.response?.data?.message || 
        error.message || 
        'Gagal terhubung ke server'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../assets/botback.jpg')} style={styles.container}>
      <Image
        source={require('../assets/logobot.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome!</Text>
      
      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        style={styles.input} 
        secureTextEntry
      />
      
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Continue</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.signupLink}>Don't Have Account? Sign Up</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#6A1B9A',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
    width: '60%',
    alignItems: 'center',
    opacity: 1,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  signupLink: {
    marginTop: 20,
    color: '#6A1B9A',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default Login;