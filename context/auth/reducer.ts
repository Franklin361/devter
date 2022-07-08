import { AuthState, User } from './provider'

export type TypeAction = { type: 'login'; payload: User } | { type: 'logout' }

export const authReducer = (
  state: AuthState,
  action: TypeAction
): AuthState => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        user: action.payload,
        status: 'authenticated'
      }
    case 'logout':
      return {
        ...state,
        user: null,
        status: 'not-authenticated'
      }

    default:
      return { ...state }
  }
}
