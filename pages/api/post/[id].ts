import { NextApiRequest, NextApiResponse } from 'next'

import admin from 'firebase-admin'

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_ACCOUNT_KEY_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ACCOUNT_KEY_PRIVATE_KEY,
      projectId: process.env.FIREBASE_ACCOUNT_KEY_PROJECT_ID
    })
  })
} catch (error) {
  console.log(error)
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const FirestoreAdmin = admin.firestore()
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
    console.log(error)
    response.status(500).json({
      error: (error as Error).message
    })
  }
}
