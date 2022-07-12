import { RefObject } from 'react'

export interface InputsFormProps {
  drag: number
  form: string
  fileObj: null | File
  inputFileRef: RefObject<HTMLInputElement>
  loading: boolean
  onInputFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleOpenExplorer: () => void
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  clearFiles: () => void
  handleDragEnter: (
    e: React.DragEvent<HTMLTextAreaElement | HTMLDivElement>
  ) => void
  handleDragLeave: (
    e: React.DragEvent<HTMLTextAreaElement | HTMLDivElement>
  ) => void
  handleDrop: (e: React.DragEvent<HTMLTextAreaElement | HTMLDivElement>) => void
}

export interface ButtonsFormProps
  extends Pick<InputsFormProps, 'loading' | 'form'> {
  handleCancel: () => void
}
