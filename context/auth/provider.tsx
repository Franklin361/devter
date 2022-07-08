import { createContext, useReducer, useEffect } from 'react'
import { Loading } from '../../components'
import { onAuthStateHasChanged, singInWithGithub } from '../../firebase'
import { authReducer } from './'
import { AuthState, AuthStateContext } from '../../interfaces'

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
    dispatch({ type: 'checking' })
    await singInWithGithub()
  }

  if (user.status === 'checking') return <Loading />

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
