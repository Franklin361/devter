import { createContext, useReducer, useEffect } from 'react'
import { Loading } from '../../components'
import { onAuthStateHasChanged, singInWithGithub } from '../../firebase'
import { authReducer } from './'
import { AuthState, AuthStateContext, User } from '../../interfaces'

const initalState: AuthState = {
  user: null,
  status: 'checking'
}

export const AuthContext = createContext({} as AuthStateContext)

export const AuthProvider = ({
  children
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const [user, dispatch] = useReducer(authReducer, initalState)

  useEffect(() => {
    onAuthStateHasChanged(dispatch)
  }, [])

  const handleLogin = async () => {
    dispatch({ type: 'checking' })
    const { ok, ...rest } = await singInWithGithub()
    if (ok) dispatch({ type: 'login', payload: { ...(rest as User) } })
    else dispatch({ type: 'logout' })
  }

  const handleLogOut = async () => {
    dispatch({ type: 'logout' })
  }

  if (user.status === 'checking') return <Loading />

  return (
    <AuthContext.Provider
      value={{
        ...user,
        handleLogin,
        handleLogOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
