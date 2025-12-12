import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles/SplashScreenStyle';
import * as Animatable from 'react-native-animatable';
import { logoIcon } from '../assests/splash-icon';

const SplashScreen = ({ navigation }) => {
  const [barColor, setBarColor] = useState('#F4E4CF');
  useEffect(() => {
    const barTimer = setTimeout(() => {
      setBarColor('#b3611eff'); // Burger King orange
    }, 2000);

    const timer = setTimeout(() => {
      navigation?.replace('Tab');
    }, 3000);
    return () => {
      clearTimeout(barTimer);
      clearTimeout(timer);
    };
  }, []);
  return (
    <View style={styles.mainContainer}>
      <StatusBar
        translucent={true}
        backgroundColor={barColor}
        barStyle="light-content"
      />
      <Animatable.Image
        animation="zoomIn"
        duration={1500}
        source={logoIcon}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;