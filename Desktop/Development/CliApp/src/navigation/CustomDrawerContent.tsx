import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Ionicons from '@react-native-vector-icons/ionicons'

const CustomDrawerContent = (props: any) => {
    const { collapsed, setCollapsed } = props

    return (
        <DrawerContentScrollView
            {...props}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 0 }}
        >
            {/* Header */}
            <View style={styles.header}>
                <Ionicons name="settings" size={20} color="#fff" />
                {/* Title */}
                {!collapsed && (
                    <Text style={styles.headerText}>New construction</Text>
                )}

                {/* Toggle button */}
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

            {/* Items */}
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

export default CustomDrawerContent

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 0,
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
})