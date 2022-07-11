import { useState } from 'react'

type DragEvent = React.DragEvent<HTMLTextAreaElement | HTMLDivElement>

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}

export const useDragAndDrop = () => {
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [fileObj, setFileObj] = useState<File | null>(null)

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]
    setFileObj(file)
  }
  const clearFiles = () => setFileObj(null)

  const handleSetFileWithoutDrag = (file: File) => {
    setFileObj(file)
  }

  return {
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    drag,
    fileObj,
    clearFiles,
    handleSetFileWithoutDrag
  }
}
