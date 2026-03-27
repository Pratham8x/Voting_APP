import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons'
import { useNavigation, DrawerActions } from '@react-navigation/native'

type Tab = {
  label: string
  value: string
  icon: string
  activeColor: string
  activeBg: string
}

type Props = {
  tabs?: Tab[]
  onTabPress?: (tab: string) => void
}

const defaultTabs: Tab[] = [
  {
    label: 'Project',
    value: 'Project',
    icon: 'briefcase',
    activeColor: '#38bdf8',
    activeBg: '#0c4a6e',
  },
  {
    label: 'Department',
    value: 'Department',
    icon: 'business',
    activeColor: '#a78bfa',
    activeBg: '#3b0764',
  },
]

const TopTabs: React.FC<Props> = ({ tabs = defaultTabs, onTabPress }) => {
  const navigation = useNavigation()
  const [activeTab, setActiveTab] = useState(tabs[0]?.value ?? '')

  const handlePress = (tab: Tab) => {
    setActiveTab(tab.value)
    onTabPress?.(tab.value)
  }

  return (
    <View style={styles.container}>
      {/* Menu Icon */}
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.menuButton}
      >
        <Ionicons name="menu-outline" size={28} color="#f1f5f9" />
      </TouchableOpacity>

      {/* Tabs — each in its own container */}
      <View style={styles.tabsRow}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.value
          return (
            <TouchableOpacity
              key={tab.value}
              onPress={() => handlePress(tab)}
              style={[
                styles.tab,
                {
                  backgroundColor: isActive ? tab.activeBg : '#1e293b',
                  borderColor: isActive ? tab.activeColor : 'transparent',
                },
              ]}
              activeOpacity={0.75}
            >
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
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

export default TopTabs

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 8,
  },
  menuButton: {
    padding: 4,
    marginRight: 30,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
  },
  icon: {
    marginRight: 6,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
})