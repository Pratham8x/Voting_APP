import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/Auth/LoginScreen'
import DrawerNavigator from './DrawerNavigator'
import { useAppSelector } from '../hooks/reduxHooks'

export type RootStackParamList = {
  LoginScreen: undefined
  MainApp: undefined
  SplashScreen:undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const AppNavigator = () => {
  const token = useAppSelector(state => state.auth.token)
  const user = useAppSelector(state => state.auth.user)

  // Only render DrawerNavigator when both token AND user with role exist
  // This prevents the "no screens" crash when role is not yet in Redux
  const isAuthenticated = token && user && user.role

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
      ) : (
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      )}
    </Stack.Navigator>
  )
}

export default AppNavigator