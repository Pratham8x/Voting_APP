import { UserRole } from '../features/auth/authTypes'

export interface MenuItem {
  title: string
  icon: string
  screenName: string
}

export const menuConfig: Record<UserRole, MenuItem[]> = {
  superadmin: [
    { title: 'Dashboard', icon: 'speedometer', screenName: 'Dashboard' },
    { title: 'My Attendance', icon: 'person-add-sharp', screenName: 'MyAttendance' },
    { title: 'Project Management', icon: 'briefcase', screenName: 'ProjectManagement' },
    { title: 'Users', icon: 'people', screenName: 'Users' },
    { title: 'Bidding', icon: 'hammer', screenName: 'Bidding' },
    { title: 'Inventory Management', icon: 'cube', screenName: 'InventoryManagement' },
    { title: 'Sales & Billing', icon: 'card', screenName: 'SalesAndBilling' },
    { title: 'Purchase Management', icon: 'cart', screenName: 'PurchaseManagement' },
    { title: 'Contract Management', icon: 'document-text', screenName: 'ContractManagement' },
    { title: 'Equipment Management', icon: 'build', screenName: 'EquipmentManagement' },
    { title: 'Document Management', icon: 'folder', screenName: 'DocumentManagement' },
    { title: 'HR & Payroll', icon: 'cash', screenName: 'HrAndPayroll' },
    { title: 'Health & Safety', icon: 'medkit', screenName: 'HealthAndSafety' },
    { title: 'Client & Vendor Portal', icon: 'business', screenName: 'ClientAndVendor' },
    { title: 'Quality Control', icon: 'checkmark-done', screenName: 'QualityControl' },
    { title: 'Finance & Account Report', icon: 'stats-chart', screenName: 'FinanceReport' },
    { title: 'CRM', icon: 'chatbubbles', screenName: 'CRM' },
  ],
  admin: [
    { title: 'Dashboard', icon: 'speedometer', screenName: 'Dashboard' },
    { title: 'My Attendance', icon: 'person-add-sharp', screenName: 'MyAttendance' },
    { title: 'Project Management', icon: 'briefcase', screenName: 'ProjectManagement' },
    { title: 'Users', icon: 'people', screenName: 'Users' },
    { title: 'Bidding', icon: 'hammer', screenName: 'Bidding' },
    { title: 'Inventory Management', icon: 'cube', screenName: 'InventoryManagement' },
    { title: 'Sales & Billing', icon: 'card', screenName: 'SalesAndBilling' },
    { title: 'Purchase Management', icon: 'cart', screenName: 'PurchaseManagement' },
    { title: 'Contract Management', icon: 'document-text', screenName: 'ContractManagement' },
    { title: 'Equipment Management', icon: 'build', screenName: 'EquipmentManagement' },
    { title: 'Document Management', icon: 'folder', screenName: 'DocumentManagement' },
    { title: 'HR & Payroll', icon: 'cash', screenName: 'HrAndPayroll' },
    { title: 'Health & Safety', icon: 'medkit', screenName: 'HealthAndSafety' },
    { title: 'Client & Vendor Portal', icon: 'business', screenName: 'ClientAndVendor' },
    { title: 'Quality Control', icon: 'checkmark-done', screenName: 'QualityControl' },
    { title: 'Finance & Account Report', icon: 'stats-chart', screenName: 'FinanceReport' },
    { title: 'CRM', icon: 'chatbubbles', screenName: 'CRM' },
  ],
  supervisor: [
    { title: 'Dashboard', icon: 'speedometer', screenName: 'Dashboard' },
    { title: 'My Attendance', icon: 'person-add-sharp', screenName: 'MyAttendance' },
    { title: 'Project Management', icon: 'briefcase', screenName: 'ProjectManagement' },
    { title: 'Users', icon: 'people', screenName: 'Users' },
    { title: 'Inventory Management', icon: 'cube', screenName: 'InventoryManagement' },
    { title: 'Sales & Billing', icon: 'card', screenName: 'SalesAndBilling' },
    { title: 'Purchase Management', icon: 'cart', screenName: 'PurchaseManagement' },
    { title: 'Contract Management', icon: 'document-text', screenName: 'ContractManagement' },
    { title: 'Equipment Management', icon: 'build', screenName: 'EquipmentManagement' },
    { title: 'Document Management', icon: 'folder', screenName: 'DocumentManagement' },
    { title: 'HR & Payroll', icon: 'cash', screenName: 'HrAndPayroll' },
    { title: 'Health & Safety', icon: 'medkit', screenName: 'HealthAndSafety' },
    { title: 'Client & Vendor Portal', icon: 'business', screenName: 'ClientAndVendor' },
    { title: 'Quality Control', icon: 'checkmark-done', screenName: 'QualityControl' },
    { title: 'Finance & Account Report', icon: 'stats-chart', screenName: 'FinanceReport' },
    { title: 'CRM', icon: 'chatbubbles', screenName: 'CRM' },
  ],
  worker: [
    { title: 'My Attendance', icon: 'person-add-sharp', screenName: 'MyAttendance' },
  ],
  subcontractor: [
    { title: 'Dashboard', icon: 'speedometer', screenName: 'Dashboard' },
    { title: 'My Attendance', icon: 'person-add-sharp', screenName: 'MyAttendance' },
  ],
  supplier: [
    { title: 'Dashboard', icon: 'speedometer', screenName: 'Dashboard' },
    { title: 'My Attendance', icon: 'person-add-sharp', screenName: 'MyAttendance' },
    { title: 'Purchase Management', icon: 'cart', screenName: 'PurchaseManagement' },
  ],
  vendor: [
    { title: 'Dashboard', icon: 'speedometer', screenName: 'Dashboard' },
    { title: 'Bidding', icon: 'hammer', screenName: 'Bidding' },
    { title: 'Document Management', icon: 'folder', screenName: 'DocumentManagement' },
  ],
  client: [
    { title: 'Dashboard', icon: 'speedometer', screenName: 'Dashboard' },
    { title: 'Project Management', icon: 'briefcase', screenName: 'ProjectManagement' },
    { title: 'Document Management', icon: 'folder', screenName: 'DocumentManagement' },
  ],
  sub_contractor: [
    { title: 'Dashboard', icon: 'speedometer', screenName: 'Dashboard' },
    { title: 'My Attendance', icon: 'person-add-sharp', screenName: 'MyAttendance' },
  ],
}