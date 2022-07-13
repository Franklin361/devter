import { PostResponse } from '../../interfaces'

interface Props extends Pick<PostResponse, 'content' | 'img'> {}

export const ContentPost = ({ content, img }: Props) => {
  return (
    <div className="mt-5 mb-2 flex flex-col gap-4 justify-center items-center">
      <pre className="font-normal w-full whitespace-pre-wrap">{content}</pre>
      {img && (
        <img
          className="w-full rounded-md border border-neutral-content/50 fadeIn"
          src={img}
          alt={content}
        />
      )}
    </div>
  )
}
