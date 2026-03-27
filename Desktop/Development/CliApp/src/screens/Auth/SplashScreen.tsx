import React, { useEffect } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type RootStackParamList = {
  Splash: undefined;
  LoginScreen: undefined;
};

type SplashScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

const SplashScreen = ({ navigation }: SplashScreenProps) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LoginScreen')
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Image
          source={require('../../assets/images/splashIcon.jpeg')}
          style={styles.icon}
          resizeMode="cover"
        />
      </View>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 150,
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
})