import {
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth'
import { Dispatch } from 'react'
import { TypeAction, User } from '../context'
import { FirebaseAuth } from './'

const githubProvider = new GithubAuthProvider()

export const singInWithGithub = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, githubProvider)
    const { displayName, email, photoURL, uid } = result.user
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (e) {
    console.log(e)
    return { ok: false }
  }
}

export const onAuthStateHasChanged = (dispatch: Dispatch<TypeAction>) => {
  onAuthStateChanged(FirebaseAuth, user => {
    if (!user) return dispatch({ type: 'logout' })
    dispatch({
      type: 'login',
      payload: user as User
    })
  })
}

export const logoutFirebase = async () => await FirebaseAuth.signOut()
