
export const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col bg-neutral-focus text-neutral-content gap-10">
        <div className="spinner"></div>
        <p className="text-5xl font-bold text-center">Loading ...</p>
    </div>
  )
}