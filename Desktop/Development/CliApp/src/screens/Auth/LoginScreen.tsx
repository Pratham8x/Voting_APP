import React, { useState } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from '@react-native-vector-icons/ionicons'

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { loginUser } from '../../features/auth/authSlice'

type RootStackParamList = {
  LoginScreen: undefined
  MainApp: undefined
}

type NavigationType = NativeStackNavigationProp<
  RootStackParamList,
  'MainApp'
>

const LoginScreen = () => {
  const navigation = useNavigation<NavigationType>()
  const dispatch = useAppDispatch()

  // Redux state
  const { loading, error } = useAppSelector(state => state.auth)

  // Local UI state only
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    // Dismiss keyboard before login
    Keyboard.dismiss()
    
    const result = await dispatch(
      loginUser({ email, password })
    )

    if (loginUser.fulfilled.match(result)) {
      navigation.replace('MainApp')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome !</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.loginHeader}>
              <Text style={styles.loginTitle}>Login</Text>
            </View>

            <View style={styles.inputSection}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  placeholder="john@example.com"
                  placeholderTextColor="#64748b"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor="#64748b"
                    secureTextEntry={!showPassword}
                    style={styles.passwordInput}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#94a3b8"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {error ? (
                <View style={styles.errorContainer}>
                  <Ionicons name="alert-circle" size={16} color="#f87171" />
                  <Text style={styles.error}>{error}</Text>
                </View>
              ) : null}

              <TouchableOpacity style={styles.forgetButton}>
                <Text style={styles.forgetText}>Forgot Password?</Text>
              </TouchableOpacity>

              <LinearGradient
                colors={['#6366f1', '#8b5cf6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                <TouchableOpacity
                  onPress={handleLogin}
                  style={styles.buttonInner}
                  activeOpacity={0.9}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Login</Text>
                  )}
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  keyboardView: { flex: 1 },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  welcomeSection: { alignItems: 'center', marginBottom: 48 },
  welcomeText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  formContainer: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 24,
    padding: 24,
  },
  loginHeader: { marginBottom: 32 },
  loginTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    alignSelf: 'center',
  },
  inputSection: { gap: 20 },
  inputWrapper: { gap: 8 },
  inputLabel: { color: '#cbd5e1' },
  input: {
    backgroundColor: '#1e293b',
    color: '#fff',
    padding: 14,
    borderRadius: 12,
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
  },
  passwordInput: {
    flex: 1,
    color: '#fff',
    padding: 14,
  },
  eyeIcon: { paddingHorizontal: 12 },
  button: { borderRadius: 12, marginTop: 8 },
  buttonInner: { padding: 14, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  error: { color: '#f87171', marginLeft: 6 },
  forgetButton: { alignItems: 'flex-end' },
  forgetText: { color: '#8b5cf6' },
})