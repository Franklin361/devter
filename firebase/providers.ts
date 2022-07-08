import {
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth'
import {
  collection,
  doc,
  getDocs,
  setDoc,
  Timestamp
} from 'firebase/firestore/lite'
import { Dispatch } from 'react'
import { PostResponse, TypeAction, User } from '../interfaces'
import { FirebaseAuth, FirebaseDB } from './'

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
      payload: {
        displayName: user.displayName!,
        email: user.email!,
        photoURL: user.photoURL!,
        uid: user.uid!
      }
    })
  })
}

export const logoutFirebase = async () => await FirebaseAuth.signOut()

interface PropsAddPost extends Pick<User, 'uid' | 'displayName' | 'photoURL'> {
  content: string
}

interface Post extends Record<string, any> {
  content: string
  likesCount: number
  sharedCount: number
  createdAt: Timestamp
}

export const addPost = async ({ content, uid, ...user }: PropsAddPost) => {
  try {
    const newPost: Post = {
      ...user,
      content,
      likesCount: 0,
      sharedCount: 0,
      createdAt: Timestamp.fromDate(new Date())
    }

    const newDoc = doc(collection(FirebaseDB, `${uid}`))
    await setDoc(newDoc, newPost)
    newPost.id = newDoc.id

    return newPost
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getPosts = async (uid: string) => {
  const collectionRef = collection(FirebaseDB, `${uid}`)
  const docs = await getDocs(collectionRef)
  const posts: PostResponse[] = []

  docs.forEach(doc => {
    const date = new Date(
      ((doc.data() as PostResponse).createdAt as any).seconds! * 1000
    )
    const normalizedCreatedAt = new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: 'numeric'
    }).format(date)

    posts.push({
      id: doc.id,
      ...(doc.data() as Pick<
        PostResponse,
        'content' | 'displayName' | 'likesCount' | 'photoURL' | 'sharedCount'
      >),
      createdAt: normalizedCreatedAt
    })
  })

  return posts
}
