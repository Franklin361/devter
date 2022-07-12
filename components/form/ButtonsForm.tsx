import { BsPlusCircle, BsArrowBarLeft } from 'react-icons/bs'
import { ButtonsFormProps } from '../../interfaces'

export const ButtonsForm = ({
  form,
  handleCancel,
  loading
}: ButtonsFormProps) => {
  return (
    <div className="flex justify-between w-full md:flex-row flex-col gap-10">
      <button
        type="submit"
        className="btn btn-primary gap-4  md:w-auto w-full"
        disabled={form.length === 0 || loading}
      >
        <span>Add Post</span>
        <BsPlusCircle className="text-xl" />
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="btn btn-info btn-outline gap-4  md:w-auto w-full"
        disabled={loading}
      >
        <span>Cancel</span>
        <BsArrowBarLeft className="text-xl" />
      </button>
    </div>
  )
}
