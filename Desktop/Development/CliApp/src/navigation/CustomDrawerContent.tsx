import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Ionicons from '@react-native-vector-icons/ionicons'
import { useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { persistor } from '../app/store'
import { navigationRef } from './RootNavigation'

const CustomDrawerContent = (props: any) => {
    const { collapsed, setCollapsed } = props
    const dispatch = useDispatch()

const handleLogout = async () => {
    dispatch(logout())
    await persistor.purge()

    navigationRef.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
    })
}

    return (
        <View style={{ flex: 1 }}>
            {/* Scrollable Area */}
            <DrawerContentScrollView
                {...props}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 0 }}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Ionicons name="settings" size={20} color="#fff" />

                    {!collapsed && (
                        <Text style={styles.headerText}>New construction</Text>
                    )}

                    <TouchableOpacity
                        style={styles.toggleBtn}
                        onPress={() => setCollapsed(!collapsed)}
                    >
                        <Ionicons
                            name={collapsed ? 'chevron-forward' : 'chevron-back'}
                            size={18}
                            color="#b3afaf"
                        />
                    </TouchableOpacity>
                </View>

                {/* Drawer Items */}
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            {/* 🔴 Bottom Logout */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                    {!collapsed && (
                        <Text style={styles.logoutText}>Logout</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomDrawerContent

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
    },
    headerText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 19,
        flex: 1,
    },
    toggleBtn: {
        marginLeft: 20,
    },

    footer: {
        borderTopWidth: 1,
        borderTopColor: '#1e293b',
        padding: 15,
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    logoutText: {
        color: '#ef4444',
        fontSize: 15,
        fontWeight: '500',
    },
})