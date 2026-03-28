import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { createProject } from '../../features/Project/projectThunk'
import TabItem from '../../components/Project/TabItem'
import DropdownMenu from '../../components/Project/DropdownMenu'
import ProjectModal from '../../components/Project/ProjectModal'
import UnitModal from '../../components/Project/UnitModal'
import Toast from 'react-native-toast-message';


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
    label: 'Unit',
    value: 'Unit',
    icon: 'business',
    activeColor: '#a78bfa',
    activeBg: '#3b0764',
  },
]

const TopTabs: React.FC<Props> = ({ tabs = defaultTabs, onTabPress }) => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [showUnitModal, setShowUnitModal] = useState(false)
  const [activeTab, setActiveTab] = useState(tabs[0]?.value ?? '')
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  
  // Sample dropdown items (you can replace these with your actual data)
  const [projectItems, setProjectItems] = useState([
    { id: '1', name: 'Project Alpha' },
    { id: '2', name: 'Project Beta' },
    { id: '3', name: 'Project Gamma' },
  ])

  const [unitItems, setUnitItems] = useState([
    { id: '1', name: 'Unit A' },
    { id: '2', name: 'Unit B' },
    { id: '3', name: 'Unit C' },
  ])

  const handleTabPress = (tab: Tab) => {
    if (activeTab === tab.value && openDropdown === tab.value) {
      setOpenDropdown(null)
    } else if (activeTab === tab.value) {
      setOpenDropdown(tab.value)
    } else {
      setActiveTab(tab.value)
      setOpenDropdown(tab.value)
      onTabPress?.(tab.value)
    }
  }

  const handleCreateNew = () => {
    if (activeTab === 'Project') {
      setShowProjectModal(true)
    } else if (activeTab === 'Unit') {
      setShowUnitModal(true)
    }
  }


const handleSubmitProject = async (form: { name: string; description: string; clientName: string; location: string }) => {
  const payload = {
    name: form.name,
    description: form.description,
    clientName: form.clientName,
    location: form.location,
  }

  try {
    await dispatch(createProject(payload)).unwrap()
    // Add the new project to the projectItems list
    const newProject = {
      id: Date.now().toString(),
      name: form.name,
    }
    setProjectItems(prev => [...prev, newProject])
    setShowProjectModal(false)
    
    // Show success toast
    Toast.show({
      type: 'success',
      text1: 'Project Created',
      text2: `"${form.name}" has been created successfully!`,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
    })
  } catch (error) {
    console.error('Failed to create project:', error)
    
    // Show error toast
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Failed to create project. Please try again.',
      position: 'bottom',
      visibilityTime: 3000,
      autoHide: true,
    })
  }
}

  const handleSubmitUnit = async (form: { name: string; description: string }) => {
    try {
      // Add your unit creation API call here
      const newUnit = {
        id: Date.now().toString(),
        name: form.name,
      }
      setUnitItems(prev => [...prev, newUnit])
      setShowUnitModal(false)
    } catch (error) {
      console.error('Failed to create unit:', error)
    }
  }

  const handleEdit = (item: any) => {
    console.log('Edit item:', item)
    // You can add your edit functionality here
  }

  const handleDelete = (item: any) => {
    console.log('Delete item:', item)
    // You can add your delete functionality here
  }

  const handleItemSelect = (item: any) => {
    console.log('Selected item:', item)
    setOpenDropdown(null)
    // You can add your selection functionality here
  }

  const currentItems = openDropdown === 'Project' ? projectItems : unitItems
  const addButtonText = openDropdown === 'Project' ? ' Create Project' : ' Create Unit'

  return (
    <View style={styles.container}>
      {/* Menu Icon */}
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.menuButton}
      >
        <Ionicons name="menu-outline" size={28} color="#f1f5f9" />
      </TouchableOpacity>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {tabs.map(tab => (
          <TabItem
            key={tab.value}
            tab={tab}
            isActive={activeTab === tab.value}
            showDropdown={openDropdown === tab.value}
            onPress={() => handleTabPress(tab)}
          />
        ))}
      </View>

      {/* Dropdown Menu */}
      <DropdownMenu
        visible={openDropdown !== null}
        items={currentItems}
        addButtonText={addButtonText}
        onClose={() => setOpenDropdown(null)}
        onCreateNew={handleCreateNew}
        onItemSelect={handleItemSelect}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Project Modal */}
      <ProjectModal
        visible={showProjectModal}
        onSubmit={handleSubmitProject}
        onClose={() => setShowProjectModal(false)}
      />

      {/* Unit Modal */}
      <UnitModal
        visible={showUnitModal}
        onSubmit={handleSubmitUnit}
        onClose={() => setShowUnitModal(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 8,
    zIndex: 1,
  },
  menuButton: {
    padding: 4,
    marginRight: 30,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 10,
  },
})

export default TopTabs