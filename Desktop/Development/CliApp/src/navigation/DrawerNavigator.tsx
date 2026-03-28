import React, { useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Ionicons from '@react-native-vector-icons/ionicons'
import CustomDrawerContent from './CustomDrawerContent'
import { useAppSelector } from '../hooks/reduxHooks'

// Screen imports
import Bidding from '../screens/Drawer/Bidding/Bidding'
import ProjectManagement from '../screens/Drawer/ProjectManagement/ProjectManagement'
import Users from '../screens/Drawer/Users/Users'
import InventoryManagement from '../screens/Drawer/InventoryManagement/InventoryManagement'
import SalesAndBilling from '../screens/Drawer/SalesAndBilling/SalesAndBilling'
import PurchaseManagement from '../screens/Drawer/PurchaseManagement/PurchaseManagement'
import ContractManagement from '../screens/Drawer/ContractManagement/ContractManagement'
import EquipmentManagement from '../screens/Drawer/EquipmentManagement/EquipmentManagement'
import DocumentManagement from '../screens/Drawer/DocumentManagement/DocumentManagement'
import HrAndPayroll from '../screens/Drawer/HrAndPayroll/HrAndPayroll'
import HealthAndSafety from '../screens/Drawer/HealthAndSafety/HealthAndSafety'
import ClientAndVendor from '../screens/Drawer/ClientAndVendor/ClientAndVendor'
import QualityControl from '../screens/Drawer/QualityControl/QualityControl'
import CRM from '../screens/Drawer/CRM/CRM'
import Dashboard from '../screens/Drawer/DashBoard/DashBoard'
import MyAttendance from '../screens/Drawer/MyAttendance/MyAttendance'
import FinanceReport from '../screens/Drawer/FinanceReport/FinanceReport'
import { menuConfig } from '../constants/rolePermissions'
import { UserRole } from '../features/auth/authTypes'

// Map screenName (from rolePermissions) → actual component
const screenComponentMap: Record<string, React.ComponentType<any>> = {
  Dashboard,
  MyAttendance,
  ProjectManagement,
  Users,
  Bidding,
  InventoryManagement,
  SalesAndBilling,
  PurchaseManagement,
  ContractManagement,
  EquipmentManagement,
  DocumentManagement,
  HrAndPayroll,
  HealthAndSafety,
  ClientAndVendor,
  QualityControl,
  FinanceReport,
  CRM,
}

// Map screenName → drawer display name (what user sees)
const screenDisplayName: Record<string, string> = {
  Dashboard: 'Dashboard',
  MyAttendance: 'My Attendance',
  ProjectManagement: 'Project Management',
  Users: 'Users',
  Bidding: 'Bidding',
  InventoryManagement: 'Inventory Management',
  SalesAndBilling: 'Sales & Billing',
  PurchaseManagement: 'Purchase Management',
  ContractManagement: 'Contract Management',
  EquipmentManagement: 'Equipment Management',
  DocumentManagement: 'Document Management',
  HrAndPayroll: 'HR & Payroll',
  HealthAndSafety: 'Health & Safety',
  ClientAndVendor: 'Client & Vendor Portal',
  QualityControl: 'Quality Control',
  FinanceReport: 'Finance & Account Report',
  CRM: 'CRM',
}

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  const [collapsed, setCollapsed] = useState(false)

  const role = useAppSelector(state => state.auth.user?.role)

  // ✅ Normalize role defensively (handles ADMIN, Admin, " admin " etc. from API)
  const normalizedRole = role?.toLowerCase().trim() as UserRole| undefined

  // Debug log — remove once confirmed working
  console.log('DRAWER ROLE raw:', role, '| normalized:', normalizedRole, '| screens:', menuConfig[normalizedRole!]?.length ?? 'NOT FOUND in menuConfig')

  const allowedScreens =
    normalizedRole && menuConfig[normalizedRole] && menuConfig[normalizedRole].length > 0
      ? menuConfig[normalizedRole]
      : [{ title: 'Dashboard', icon: 'speedometer', screenName: 'Dashboard' }]

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      )}
      screenOptions={({ route }) => {
        // Find icon for current route from allowedScreens
        const menuItem = allowedScreens.find(item => item.screenName === route.name)
        const iconName = menuItem?.icon ?? 'ellipse'

        return {
          headerShown: false,
          drawerType: 'front',
          drawerStyle: {
            backgroundColor: '#0f172a',
            width: collapsed ? 100 : 260,
          },
          drawerItemStyle: {
            borderRadius: 16,
          },
          drawerActiveTintColor: '#000',
          drawerInactiveTintColor: '#94a3b8',
          drawerActiveBackgroundColor: '#ddd',
          drawerLabelStyle: {
            display: collapsed ? 'none' : 'flex',
          },
          drawerIcon: ({ color }) => (
            <Ionicons name={iconName as any} size={18} color={color} />
          ),
        }
      }}
    >
      {allowedScreens.map(({ screenName, title }) => {
        const Component = screenComponentMap[screenName]

        // Skip if component not found (safety guard)
        if (!Component) return null

        return (
          <Drawer.Screen
            key={screenName}
            name={screenName}
            component={Component}
            options={{
              drawerLabel: title,
              title: screenDisplayName[screenName] ?? title,
            }}
          />
        )
      })}
    </Drawer.Navigator>
  )
}

export default DrawerNavigator