import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons'

// ── Activity Data ─────────────────────────────────────────────────────────────
const activities = [
  {
    task:    'Project milestone completed',
    status:  'On Track',
    time:    '2 hours ago',
    color:   '#16a34a',
    bgColor: '#dcfce7',
    icon:    'checkmark-circle',
  },
  {
    task:    'Budget approval requested',
    status:  'Delayed',
    time:    '4 hours ago',
    color:   '#d97706',
    bgColor: '#fef3c7',
    icon:    'warning',
  },
  {
    task:    'Safety inspection scheduled',
    status:  'Ongoing',
    time:    '5 hours ago',
    color:   '#2563eb',
    bgColor: '#dbeafe',
    icon:    'time',
  },
  {
    task:    'Delay reported',
    status:  'Blocked',
    time:    '1 day ago',
    color:   '#dc2626',
    bgColor: '#fee2e2',
    icon:    'close-circle',
  },
  {
    task:    'Quality check passed',
    status:  'On Track',
    time:    '2 days ago',
    color:   '#16a34a',
    bgColor: '#dcfce7',
    icon:    'checkmark-circle',
  },
]

// ── Component ─────────────────────────────────────────────────────────────────
const RecentActivity = () => {
  return (
    <View style={styles.card}>

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="pulse-outline" size={20} color="#4f46e5" />
        <Text style={styles.cardTitle}>Recent Activity</Text>
      </View>

      {/* Column headers */}
      <View style={styles.colHeaders}>
        <Text style={[styles.colHeader, { flex: 2.4 }]}>Task</Text>
        <Text style={[styles.colHeader, { flex: 1.5 }]}>Status</Text>
        <Text style={[styles.colHeader, { flex: 1.4 }]}>Deadline</Text>
      </View>

      <View style={styles.dividerLine} />

      {/* Rows */}
      {activities.map((item, i) => (
        <View key={i}>
          <View style={styles.row}>

            {/* Task */}
            <View style={{ flex: 2.4 }}>
              <Text style={styles.taskText} numberOfLines={2}>
                {item.task}
              </Text>
            </View>

            {/* Status badge */}
            <View style={{ flex: 1.5 }}>
              <View style={[styles.badge, { backgroundColor: item.bgColor }]}>
                <Ionicons
                  name={item.icon as any}
                  size={11}
                  color={item.color}
                  style={{ marginRight: 3 }}
                />
                <Text style={[styles.badgeText, { color: item.color }]}>
                  {item.status}
                </Text>
              </View>
            </View>

            {/* Time */}
            <View style={{ flex: 1.4 }}>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>

          </View>

          {/* Row divider — skip last */}
          {i < activities.length - 1 && (
            <View style={styles.rowDivider} />
          )}
        </View>
      ))}

    </View>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 24,
    paddingVertical: 18,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  cardTitle: {
    color: '#1e293b',
    fontSize: 16,
    fontWeight: '700',
  },
  colHeaders: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  colHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  taskText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1e293b',
    paddingRight: 8,
    lineHeight: 18,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  timeText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '400',
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#f8fafc',
  },
})

export default RecentActivity