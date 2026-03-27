import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons'
import { useNavigation, DrawerActions } from '@react-navigation/native'

const CameraScreen = () => {
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1, backgroundColor: '#0f172a', padding: 20 }}>
      
      {/* MENU BUTTON */}
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Ionicons name="menu" size={28} color="#fff" />
      </TouchableOpacity>

      <Text style={{ color: '#fff', marginTop: 20 }}>
        Camera Screen
      </Text>

    </View>
  )
}

export default CameraScreen