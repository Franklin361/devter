import { NextApiResponse, NextApiRequest } from 'next'
import admin from 'firebase-admin'

import serviceAccount from '../../../firebase/serviceAccountKey.json'
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any)
  })
} catch (error) {}

export const FirestoreAdmin = admin.firestore()

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query as { id: string }

  try {
    const doc = await FirestoreAdmin.collection('posts').doc(`${id}`).get()
    const data = doc.data()

    if (!data) return response.status(400).json({ error: 'Post no exists' })
    const { createdAt } = data

    response.status(200).json({
      ...data,
      id: doc.id,
      createdAt: +createdAt.toDate()
    })
  } catch (error) {
    response.status(500).json({
      error: (error as Error).message
    })
  }
}
