import admin from 'firebase-admin'
import { Timestamp } from 'firebase/firestore'
import { PostResponse } from '../interfaces/api'

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_ACCOUNT_KEY_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ACCOUNT_KEY_PRIVATE_KEY,
      projectId: process.env.FIREBASE_ACCOUNT_KEY_PROJECT_ID
    })
  })
} catch (error) {}

export const FirestoreAdmin = admin.firestore()

export const getSinglePost = async (
  id: string
): Promise<PostResponse | null> => {
  try {
    const doc = await FirestoreAdmin.collection('posts').doc(`${id}`).get()
    const data = doc.data() as PostResponse
    const { createdAt } = doc.data() as { createdAt: Timestamp }

    return {
      ...data,
      id: doc.id,
      createdAt: +createdAt.toDate()
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
