import { NextApiRequest, NextApiResponse } from 'next'

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   res.status(200).json({ name: 'John Doe' })
// }

import admin from 'firebase-admin'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.FIREBASE_ACCOUNT_KEY_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ACCOUNT_KEY_PRIVATE_KEY,
        projectId: process.env.FIREBASE_ACCOUNT_KEY_PROJECT_ID
      })
    })
  } catch (error) {}

  const FirestoreAdmin = admin.firestore()
  const { id } = request.query as { id: string }
  console.log({ id })
  try {
    const doc = await FirestoreAdmin.collection('posts').doc(`${id}`).get()
    const data = doc.data()

    if (!data) return response.status(400).json({ error: 'Post no exists' })
    const { createdAt } = data

    response.status(200).json({
      ...data,
      id: 'cerro',
      createdAt: +createdAt.toDate()
    })
  } catch (error) {
    console.log(error)
    response.status(500).json({
      error: (error as Error).message
    })
  }
}
