export const LoadingPost = ({ label }: { label: string }) => {
  return (
    <div className="fixed z-50 w-screen h-screen top-0 left-0 bg-black/50 flex justify-center items-center">
      <p className="text-xl text-center w-full text-info">{label}</p>
    </div>
  )
}
