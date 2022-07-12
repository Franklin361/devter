import { InputsFormProps } from '../../interfaces'
import { BsXCircle } from 'react-icons/bs'

export const ImagePreview = ({
  clearFiles,
  fileObj
}: Pick<InputsFormProps, 'clearFiles' | 'fileObj'>) => {
  return (
    <div className={`${fileObj ? 'block p-4' : 'hidden'}`}>
      {fileObj && (
        <div className="relative w-3/12 h-28">
          <button
            className="btn btn-circle bg-black/70 btn-md absolute -right-5 -top-5"
            type="button"
            onClick={clearFiles}
          >
            <BsXCircle className="text-2xl" />
          </button>
          <img
            className="w-full h-full object-cover align-top rounded-md"
            src={URL.createObjectURL(fileObj).toString()}
            alt={fileObj.name}
          />
        </div>
      )}
    </div>
  )
}
