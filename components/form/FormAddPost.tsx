import { useFormPost } from '../../hooks'
import { LoadingPost, ButtonsForm, InputsForm } from '..'

export const FormAddPost = () => {
  const { inputFileRef, fileObj, drag, loading, form, ...event } = useFormPost()

  return (
    <form
      className="flex flex-col gap-5 items-start w-full max-w-2xl mx-auto md:pb-0 pb-16"
      onSubmit={event.handleSubmit}
    >
      <InputsForm
        clearFiles={event.clearFiles}
        drag={drag}
        fileObj={fileObj}
        form={form}
        inputFileRef={inputFileRef}
        loading={loading}
        handleChange={event.handleChange}
        handleDragEnter={event.handleDragEnter}
        handleDragLeave={event.handleDragLeave}
        handleDrop={event.handleDrop}
        handleOpenExplorer={event.handleOpenExplorer}
        onInputFileChange={event.onInputFileChange}
      />
      <ButtonsForm
        form={form}
        handleCancel={event.handleCancel}
        loading={loading}
      />
      {loading && <LoadingPost label="Creating post ..." />}
    </form>
  )
}
