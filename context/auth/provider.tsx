import { createContext, useReducer, useEffect } from 'react'
import { onAuthStateHasChanged, singInWithGithub } from '../../firebase'
import { authReducer } from './'

export type User = {
  displayName: string
  email: string
  photoURL: string
  uid: string
}

type TypeStatus = 'authenticated' | 'checking' | 'not-authenticated'

export type AuthState = {
  user: User | null
  status: TypeStatus
}

type AuthStateContext = {
  handleLogin: () => void
} & AuthState

const initalState: AuthState = {
  user: null,
  status: 'checking'
}

export const AuthContext = createContext({} as AuthStateContext)

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, dispatch] = useReducer(authReducer, initalState)

  useEffect(() => {
    onAuthStateHasChanged(dispatch)
  }, [])

  const handleLogin = async () => {
    const { ok, ...rest } = await singInWithGithub()
    if (ok) {
      dispatch({
        type: 'login',
        payload: { ...(rest as User) }
      })
    } else dispatch({ type: 'logout' })
  }

  return (
    <AuthContext.Provider
      value={{
        ...user,
        handleLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
