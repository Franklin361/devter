export const PostSkeleton = () => {
  return (
    <div className="cursor-auto  border border-gray-500 p-5 rounded-md bg-black/70 max-w-xl mx-auto w-full mb-10 shadow-2xl shadow-black">
      <header className="flex justify-between items-center">
        <div className="flex w-full items-center gap-5">
          <div className="rounded-full w-12 h-12 bg-gray-700 skeleton" />
          <div className="h-10 flex-1 rounded bg-gray-700 skeleton" />
        </div>
      </header>

      <div className="skeleton w-full h-16 bg-gray-700 rounded mt-5" />

      <div className="w-full flex justify-end">
        <div className=" h-7 w-2/12 bg-gray-700 rounded mt-5" />
      </div>
    </div>
  )
}
