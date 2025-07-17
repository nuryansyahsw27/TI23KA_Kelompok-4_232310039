import { Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const screenWidth = width;
export const screenHeight = height;

export const scaleFont = (size) => size * (width / 375); 

export const topInset = isIOS ? 33 : StatusBar.currentHeight || 20;