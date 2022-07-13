import { Dispatch } from 'react'
import {
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth'
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  setDoc,
  Timestamp
} from 'firebase/firestore/lite'
import { onSnapshot } from 'firebase/firestore'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes
} from 'firebase/storage'
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
  fileName?: string
  userId: string
}

interface Post extends Record<string, any> {
  content: string
  likes: string[]
  createdAt: Timestamp
}

export const addPost = async ({ content, ...user }: PropsAddPost) => {
  try {
    const newPost: Post = {
      ...user,
      content,
      likes: [],
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

const mapDocs = (docs: QueryDocumentSnapshot<DocumentData>[]) => {
  return docs.map(doc => {
    const data = doc.data() as Pick<
      PostResponse,
      'content' | 'displayName' | 'likes' | 'photoURL' | 'img' | 'userId'
    >

    const normalizedCreatedAt = +(
      doc.data() as { createdAt: Timestamp }
    ).createdAt.toDate()

    return {
      ...data,
      id: doc.id,
      createdAt: normalizedCreatedAt
    }
  })
}

export const getPosts = async () => {
  const q = query(collection(FirebaseDB, 'posts'), orderBy('createdAt', 'desc'))

  const { docs } = await getDocs(q)

  return mapDocs(docs)
}

export const listenLatestPosts = (
  callback: (posts: PostResponse[]) => void
) => {
  const q = query(collection(FirebaseDB, 'posts'), orderBy('createdAt', 'desc'))
  return onSnapshot(q, ({ docs }) => {
    const posts = mapDocs(docs)
    callback(posts)
  })
}

export const uploadImage = async (file: File) => {
  try {
    const storageRef = ref(FirebaseStorage, `/images/${file.name}`)
    await uploadBytes(storageRef, file)
    const image = await getDownloadURL(storageRef)
    return {
      ok: true,
      image,
      fileName: file.name
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false
    }
  }
}

export const deletePost = async (postId: string, fileName?: string) => {
  try {
    const docRef = doc(FirebaseDB, `posts/${postId}`)
    if (fileName) {
      const imgRef = ref(FirebaseStorage, `images/${fileName}`)
      await deleteObject(imgRef)
      await deleteDoc(docRef)
    } else {
      await deleteDoc(docRef)
    }
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

interface UpdateProps {
  post: PostResponse
  callback: (post: PostResponse) => void
}

export const updatePostLikeOrShare = async ({
  post,
  callback
}: UpdateProps) => {
  // console.log(post)
  delete (post as any).createdAt
  const docRef = doc(FirebaseDB, `posts/${post.id}`)

  await setDoc(docRef, post, { merge: true })

  onSnapshot(docRef, doc => {
    const data = doc.data() as PostResponse
    if (doc.exists()) callback(data)
  })
}
