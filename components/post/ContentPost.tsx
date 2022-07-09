import { PostResponse } from '../../interfaces'

export const ContentPost = ({
  content,
  img
}: Pick<PostResponse, 'content' | 'img'>) => {
  return (
    <div className="mt-5 mb-2 flex flex-col gap-4 justify-center items-center">
      <p className="font-normal w-full">{content}</p>
      {img && (
        <img
          className="w-full rounded-md border border-neutral-content/50"
          src={img}
          alt={content}
        />
      )}
    </div>
  )
}
