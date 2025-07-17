import React from 'react';
import { View } from 'react-native';
import Home from '../components/Home';

const HomeScreen = ({ navigation, route }) => {
  const email = route?.params?.email;

  return (
    <Home navigation={navigation} email={email} />
  );
};

export default HomeScreen;