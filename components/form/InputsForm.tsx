import { InputsFormProps } from '../../interfaces'
import { ImagePreview, InputFile } from './'

export const InputsForm = ({
  drag,
  fileObj,
  inputFileRef,
  loading,
  form,
  ...event
}: InputsFormProps) => {
  return (
    <div
      className={`h-56 flex flex-col border w-full border-gray-500 rounded-lg relative ${
        drag === 1 ? 'bg-black/80' : ''
      } ${fileObj ? 'h-72' : 'h-56'}`}
    >
      <InputFile
        handleOpenExplorer={event.handleOpenExplorer}
        inputFileRef={inputFileRef}
        onInputFileChange={event.onInputFileChange}
      />
      <textarea
        className="text-xl resize-none bg-transparent focus:outline-none flex-1 p-5"
        disabled={loading}
        onChange={event.handleChange}
        onDragEnter={event.handleDragEnter}
        onDragLeave={event.handleDragLeave}
        onDrop={event.handleDrop}
        placeholder="What's happening?"
        value={form}
      />
      <ImagePreview clearFiles={event.clearFiles} fileObj={fileObj} />
    </div>
  )
}
