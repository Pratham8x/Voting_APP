import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons'

type DropdownItem = {
  id: string
  name: string
}

type DropdownMenuProps = {
  visible: boolean
  items: DropdownItem[]
  addButtonText: string
  onClose: () => void
  onCreateNew: () => void
  onItemSelect: (item: DropdownItem) => void
  onEdit: (item: DropdownItem) => void
  onDelete: (item: DropdownItem) => void
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  visible,
  items,
  addButtonText,
  onClose,
  onCreateNew,
  onItemSelect,
  onEdit,
  onDelete,
}) => {
  if (!visible) return null

  return (
    <>
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      />
      <View style={styles.dropdown}>
        {/* Add New Button */}
        <TouchableOpacity 
          style={styles.addButton}
          onPress={onCreateNew}
        >
          <Ionicons name="add-circle-outline" size={20} color="#38bdf8" />
          <Text style={styles.addButtonText}>{addButtonText}</Text>
        </TouchableOpacity>
        
        {/* Dropdown Items */}
        <ScrollView style={styles.dropdownList}>
          {items.map((item) => (
            <View key={item.id} style={styles.dropdownItem}>
              <TouchableOpacity 
                style={styles.itemContent}
                onPress={() => onItemSelect(item)}
              >
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
              
              {/* Edit and Delete Icons */}
              <View style={styles.itemActions}>
                <TouchableOpacity 
                  style={styles.actionIcon}
                  onPress={() => onEdit(item)}
                >
                  <Ionicons name="create-outline" size={18} color="#64748b" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionIcon}
                  onPress={() => onDelete(item)}
                >
                  <Ionicons name="trash-outline" size={18} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 70,
    backgroundColor: '#1e293b',
    borderRadius: 10,
    minWidth: 200,
    maxHeight: 300,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  addButtonText: {
    color: '#38bdf8',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  dropdownList: {
    maxHeight: 250,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    color: '#f1f5f9',
    fontSize: 14,
  },
  itemActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionIcon: {
    padding: 4,
  },
})

export default DropdownMenu