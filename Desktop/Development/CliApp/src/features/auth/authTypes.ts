export type UserRole =
  | 'superadmin'
  | 'admin'
  | 'supervisor'
  | 'worker'
  | 'subcontractor'
  | 'supplier'
  | 'vendor'
  | 'client'
  | 'sub_contractor'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}