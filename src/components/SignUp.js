import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!email || !username || !password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|id)$/;
    if (!emailPattern.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address ending with .com or .id');
      return;
    }

    try {
      console.log('Data to send:', { email, username, password }); 

      const response = await axios.post(
        'http://192.168.100.13/CRMChatbot/register.php', 
        new URLSearchParams({
          email: email,
          username: username,
          password: password
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      
      console.log('Response:', response.data); 
      if (response.data.message === 'User registered successfully') {
        navigation.navigate('LoginScreen');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ImageBackground source={require('../assets/botback.jpg')} style={styles.container}>
      <Text style={styles.title}> Let's Set Up Your Account </Text>
      <TextInput 
        placeholder="Email Address" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Username" 
        value={username} 
        onChangeText={setUsername} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        style={styles.input} 
        secureTextEntry 
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
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
  title: {
    fontSize: 28,
    marginBottom: 50,
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
  },
  button: {
    backgroundColor: '#6A1B9A',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#ddd',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
    width: '30%',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    color: '#6A1B9A',
    fontWeight: 'bold',
  },
});

export default SignUp;
