import { AuthState, TypeAction } from '../../interfaces'

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
    case 'checking':
      return {
        ...state,
        status: 'checking'
      }
    default:
      return { ...state }
  }
}
