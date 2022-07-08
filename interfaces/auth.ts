export interface User {
  displayName: string
  email: string
  photoURL: string
  uid: string
}

export type TypeStatus = 'authenticated' | 'checking' | 'not-authenticated'

export interface AuthState {
  user: User | null
  status: TypeStatus
}

export type AuthStateContext = {
  handleLogin: () => void
} & AuthState

export type TypeAction =
  | { type: 'login'; payload: User }
  | { type: 'logout' }
  | { type: 'checking' }
