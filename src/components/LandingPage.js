import React from 'react';
import { View, Text, Button, ImageBackground, Image, StyleSheet, TouchableOpacity } from 'react-native';

const LandingPage = ({ navigation }) => {
  return (
    <ImageBackground source={require('../assets/botback.jpg')} style={styles.container}>
      <Image source={require('../assets/logobot.png')} style={styles.logo} />
      <Text style={styles.title}> How May I Assist You Today? </Text>
       <Text style={styles.subtitle}>
        I'm here to help you with information and guide you through the registration process.
      </Text>
     <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    color: '#000', 
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6A1B9A',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LandingPage;
