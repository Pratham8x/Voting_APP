import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import RevVSExp from './RevVsExp'
import ProjectProgress from './ProjectProgress'
import TeamDist from './TeamDist'
import RecentActivity from './RecentActivity'
import TopTabs from '../../../components/common/TopTabs'

const { width } = Dimensions.get('window')
const CARD_WIDTH = (width - 48) / 2

const stats = [
  {
    icon: 'briefcase-outline',
    label: 'Active Projects',
    value: '5',
    bg: '#1d4ed8',
    shadow: '#1e3a8a',
  },
  {
    icon: 'people-outline',
    label: 'Team Members',
    value: '303',
    bg: '#16a34a',
    shadow: '#14532d',
  },
  {
    icon: 'wallet-outline',
    label: 'Total Budget',
    value: '$110.5M',
    bg: '#7c3aed',
    shadow: '#4c1d95',
  },
  {
    icon: 'cash-outline',
    label: 'Total Spent',
    value: '$60.1M',
    bg: '#ea580c',
    shadow: '#7c2d12',
  },
]

const statusCards = [
  {
    icon: 'checkmark-circle-outline',
    label: 'On Track',
    value: '8',
  },
  {
    icon: 'time-outline',
    label: 'Delayed',
    value: '3',
  },
  {
    icon: 'warning-outline',
    label: 'Critical',
    value: '2',
  },
]

const Dashboard = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

<TopTabs />

        {/* Title block */}
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Project: New Construction</Text>
        </View>

        {/* 4 Stat cards — 2x2 grid */}
        <View style={styles.grid}>
          {stats.map((item, index) => (
            <View
              key={index}
              style={[styles.card, { backgroundColor: item.bg }]}
            >
              <View style={[styles.cardCircle, { backgroundColor: item.shadow }]} />
              <Ionicons
                name={item.icon as any}
                size={32}
                color="rgba(255,255,255,0.95)"
                style={styles.cardIcon}
              />
              <Text style={styles.cardLabel}>{item.label}</Text>
              <Text style={styles.cardValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* 3 Status cards — one per row */}
        <View style={styles.statusList}>
          {statusCards.map((item, index) => (
            <View key={index} style={styles.statusCard}>
              <Ionicons
                name={item.icon as any}
                size={26}
                color="#0f172a"
                style={styles.statusIcon}
              />
              <Text style={styles.statusLabel}>{item.label}</Text>
              <Text style={styles.statusValue}>{item.value}</Text>
            </View>
          ))}
        </View>
<RevVSExp/>
<ProjectProgress />
<TeamDist/>
<RecentActivity />

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  // Header
  headerRow: {
    paddingTop: 10,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: 4,
  },

  // Title
  titleBlock: {
    marginTop: 12,
    marginBottom: 28,
  },
  title: {
    color: '#f1f5f9',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
  },

  // 4-card Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  cardCircle: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    top: -24,
    right: -24,
    opacity: 0.6,
  },
  cardIcon: {
    marginBottom: 14,
  },
  cardLabel: {
    color: 'rgba(255,255,255,0.80)',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
    lineHeight: 18,
  },
  cardValue: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  // Status List — 3 separate full-width rows
  statusList: {
    marginTop: 16,
    gap: 12,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  statusIcon: {
    marginRight: 16,
  },
  statusLabel: {
    flex: 1,
    color: '#334155',
    fontSize: 15,
    fontWeight: '600',
  },
  statusValue: {
    color: '#0f172a',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
})

export default Dashboard