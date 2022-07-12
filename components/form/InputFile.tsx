import { BsUpload } from 'react-icons/bs'
import { InputsFormProps } from '../../interfaces'

export const InputFile = ({
  handleOpenExplorer,
  inputFileRef,
  onInputFileChange
}: Pick<
  InputsFormProps,
  'inputFileRef' | 'onInputFileChange' | 'handleOpenExplorer'
>) => {
  return (
    <div className="flex justify-end absolute -top-4 left-0 w-full">
      <input
        type="file"
        className="hidden"
        ref={inputFileRef}
        onChange={onInputFileChange}
      />
      <button
        className="btn btn-sm gap-4"
        onClick={handleOpenExplorer}
        type="button"
      >
        Upload
        <BsUpload className="text-md" />
      </button>
    </div>
  )
}
