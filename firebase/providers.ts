import { Dispatch } from 'react'
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
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { FirebaseAuth, FirebaseDB, FirebaseStorage } from './'
import { PostResponse, TypeAction, User } from '../interfaces'

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

interface PropsAddPost extends Pick<User, 'displayName' | 'photoURL'> {
  content: string
  img?: string
}

interface Post extends Record<string, any> {
  content: string
  likesCount: number
  sharedCount: number
  createdAt: Timestamp
}

export const addPost = async ({ content, ...user }: PropsAddPost) => {
  try {
    const newPost: Post = {
      ...user,
      content,
      likesCount: 0,
      sharedCount: 0,
      createdAt: Timestamp.fromDate(new Date())
    }
    const newDoc = doc(collection(FirebaseDB, 'posts'))
    await setDoc(newDoc, newPost)
    newPost.id = newDoc.id

    return newPost
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getPosts = async () => {
  const collectionRef = collection(FirebaseDB, 'posts')
  const docs = await getDocs(collectionRef)
  const posts: PostResponse[] = []

  docs.forEach(doc => {
    const normalizedCreatedAt = +(
      doc.data() as { createdAt: Timestamp }
    ).createdAt.toDate()

    posts.push({
      id: doc.id,
      ...(doc.data() as Pick<
        PostResponse,
        | 'content'
        | 'displayName'
        | 'likesCount'
        | 'photoURL'
        | 'sharedCount'
        | 'img'
      >),
      createdAt: normalizedCreatedAt
    })
  })

  return posts.sort((a, b) => -a.createdAt + b.createdAt)
}

export const uploadImage = async (file: File) => {
  try {
    const storageRef = ref(FirebaseStorage, `/images/${file.name}`)
    await uploadBytes(storageRef, file)
    const image = await getDownloadURL(storageRef)
    return {
      ok: true,
      image
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false
    }
  }
}
