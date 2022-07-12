import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useDragAndDrop, useAuthContext } from './'
import { addPost, uploadImage } from '../firebase'

type TextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>
type FormEvent = React.FormEvent<HTMLFormElement>

export const useFormPost = () => {
  const { drag, fileObj, ...events } = useDragAndDrop()

  const [form, setForm] = useState('')
  const [loading, setloading] = useState(false)
  const router = useRouter()
  const { user } = useAuthContext()

  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleCancel = () => router.push('/home')

  const handleChange = (e: TextAreaEvent) => setForm(e.target.value)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (form.trim().length === 0) return

    setloading(() => true)

    let isSuccessImageUploaded = true
    let imageURL: string = ''

    if (fileObj) {
      const res = await uploadImage(fileObj)
      isSuccessImageUploaded = res.ok
      imageURL = res.image ?? ''
    }

    const res = await addPost({
      content: form,
      displayName: user?.displayName!,
      photoURL: user?.photoURL!,
      userId: user?.uid!,
      ...(fileObj ? { img: imageURL } : {}),
      ...(fileObj ? { fileName: fileObj.name } : {})
    })

    setloading(() => false)

    if (isSuccessImageUploaded && res) {
      router.push('/home')
    }
  }

  const handleOpenExplorer = () => inputFileRef.current?.click()

  const onInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    if (file.type.includes('image')) events.handleSetFileWithoutDrag(file)
    else alert('That does not an image!')
  }
  return {
    loading,
    drag,
    fileObj,
    inputFileRef,
    form,
    ...events,
    handleOpenExplorer,
    handleSubmit,
    handleChange,
    handleCancel,
    onInputFileChange
  }
}
