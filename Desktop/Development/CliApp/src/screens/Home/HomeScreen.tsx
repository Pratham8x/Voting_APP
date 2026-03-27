import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
  const navigation: any = useNavigation()

  return (
    <View style={{ flex: 1, backgroundColor: '#0f172a', padding: 20 }}>
      {/* MENU BUTTON */}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={28} color="#fff" />
      </TouchableOpacity>

      <Text style={{ color: '#fff', marginTop: 20 }}>
        Home Screen
      </Text>

    </View>
  )
}

export default HomeScreen