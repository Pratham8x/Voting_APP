import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons'
import { useNavigation, DrawerActions } from '@react-navigation/native'

const Users = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ── Top Header Box ─────────────────────────────────────────────── */}
      <View style={styles.headerBox}>

        {/* Left: hamburger + icon + title */}
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={styles.menuButton}
          >
            <Ionicons name="menu-outline" size={28} color="#f1f5f9" />
          </TouchableOpacity>

          <Ionicons name="people-outline" size={22} color="#f1f5f9" style={styles.titleIcon} />
          <Text style={styles.headerTitle}>User Management</Text>
        </View>

        {/* Right: action buttons */}
        <View style={styles.headerActions}>

          {/* Add User */}
          <TouchableOpacity style={[styles.actionBtn, styles.addBtn]} activeOpacity={0.8}>
            <Ionicons name="add" size={15} color="#ffffff" />
            <Text style={styles.addBtnText}>Add User</Text>
          </TouchableOpacity>

          {/* Edit */}
          <TouchableOpacity style={[styles.actionBtn, styles.editBtn]} activeOpacity={0.8}>
            <Ionicons name="create-outline" size={15} color="#ffffff" />
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>

          {/* Delete */}
          <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} activeOpacity={0.8}>
            <Ionicons name="trash-outline" size={15} color="#ffffff" />
            <Text style={styles.deleteBtnText}>Delete</Text>
          </TouchableOpacity>

        </View>
      </View>

      {/* ── Screen content goes below ───────────────────────────────────── */}
      <View style={styles.content}>
        <Ionicons name="people-outline" size={48} color="#1e3a5f" />
        <Text style={styles.placeholder}>Users will appear here</Text>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },

  // ── Header Box ────────────────────────────────────────────────────────
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    flexWrap: 'wrap',
    gap: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuButton: {
    padding: 4,
    marginRight: 4,
  },
  titleIcon: {
    marginRight: 2,
  },
  headerTitle: {
    color: '#f1f5f9',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // ── Action Buttons ────────────────────────────────────────────────────
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 8,
  },
  addBtn: {
    backgroundColor: '#2563eb',
  },
  addBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  editBtn: {
    backgroundColor: '#0369a1',
  },
  editBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  deleteBtn: {
    backgroundColor: '#dc2626',
  },
  deleteBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },

  // ── Content ───────────────────────────────────────────────────────────
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  placeholder: {
    color: '#475569',
    fontSize: 15,
    fontWeight: '500',
  },
})

export default Users