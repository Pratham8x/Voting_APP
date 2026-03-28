import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons'

type Tab = {
  label: string
  value: string
  icon: string
  activeColor: string
  activeBg: string
}

type TabItemProps = {
  tab: Tab
  isActive: boolean
  showDropdown: boolean
  onPress: () => void
}

const TabItem: React.FC<TabItemProps> = ({ tab, isActive, showDropdown, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.tab,
        {
          backgroundColor: isActive ? tab.activeBg : '#1e293b',
          borderColor: isActive ? tab.activeColor : 'transparent',
          borderBottomLeftRadius: showDropdown ? 0 : 10,
          borderBottomRightRadius: showDropdown ? 0 : 10,
        },
      ]}
      activeOpacity={0.75}
    >
      <View style={styles.tabContent}>
        <View style={styles.tabLeft}>
          <Ionicons
            name={isActive ? tab.icon : `${tab.icon}-outline` as any}
            size={15}
            color={isActive ? tab.activeColor : '#64748b'}
            style={styles.icon}
          />
          <Text
            style={[
              styles.tabText,
              { color: isActive ? tab.activeColor : '#64748b' },
            ]}
          >
            {tab.label}
          </Text>
        </View>
        <Ionicons
          name={showDropdown ? "chevron-up" : "chevron-down"}
          size={16}
          color={isActive ? tab.activeColor : '#64748b'}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    minWidth: 120,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  tabLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    marginRight: 8,
  },
})

export default TabItem