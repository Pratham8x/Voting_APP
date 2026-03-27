import React, { useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Ionicons from '@react-native-vector-icons/ionicons'

import CustomDrawerContent from './CustomDrawerContent'
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

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      )}
      screenOptions={({ route }) => ({
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
        drawerIcon: ({ color }) => {
          let iconName: any

          switch (route.name) {
            case 'Dashboard':
              iconName = 'speedometer'
              break
            case 'My Attendance':
              iconName = 'person-add-sharp'
              break
            case 'Project Management':
              iconName = 'briefcase'
              break
            case 'Users':
              iconName = 'person-add-sharp'
              break
            case 'Bidding':
              iconName = 'hammer'
              break
            case 'Inventory Management':
              iconName = 'cube'
              break
            case 'Sales & Billing':
              iconName = 'card'
              break
            case 'Purchase Management':
              iconName = 'cart'
              break
            case 'Contract Management':
              iconName = 'document-text'
              break
            case 'Equipment Management':
              iconName = 'build'
              break
            case 'Document Management':
              iconName = 'folder'
              break
            case 'HR & Payroll':
              iconName = 'cash'
              break
            case 'Health & Safety':
              iconName = 'medkit'
              break
            case 'Client & Vendor Portal':
              iconName = 'business'
              break
            case 'Quality Control':
              iconName = 'checkmark-done'
              break
            case 'Finance & Account Report':
              iconName = 'stats-chart'
              break
            case 'CRM':
              iconName = 'chatbubbles'
              break
            default:
              iconName = 'ellipse'
          }

          return <Ionicons name={iconName} size={18} color={color} />
        },
      })}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
            <Drawer.Screen name="My Attendance" component={MyAttendance} />

      <Drawer.Screen name="Project Management" component={ProjectManagement} />
      <Drawer.Screen name="Users" component={Users} />
      <Drawer.Screen name="Bidding" component={Bidding} />
      <Drawer.Screen name="Inventory Management" component={InventoryManagement} />
      <Drawer.Screen name="Sales & Billing" component={SalesAndBilling} />
      <Drawer.Screen name="Purchase Management" component={PurchaseManagement} />
      <Drawer.Screen name="Contract Management" component={ContractManagement} />
      <Drawer.Screen name="Equipment Management" component={EquipmentManagement} />
      <Drawer.Screen name="Document Management" component={DocumentManagement} />
      <Drawer.Screen name="HR & Payroll" component={HrAndPayroll} />
      <Drawer.Screen name="Health & Safety" component={HealthAndSafety} />
      <Drawer.Screen name="Client & Vendor Portal" component={ClientAndVendor} />
      <Drawer.Screen name="Quality Control" component={QualityControl} />
      <Drawer.Screen name="Finance & Account Report" component={MyAttendance} />
      <Drawer.Screen name="CRM" component={CRM} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator