import { PostResponse } from '../../interfaces'

interface Props extends Pick<PostResponse, 'content' | 'img'> {
  completePost: boolean
}

export const ContentPost = ({ content, img, completePost }: Props) => {
  return (
    <div className="mt-5 mb-2 flex flex-col gap-4 justify-center items-center">
      {completePost ? (
        <pre className="font-normal w-full">{content}</pre>
      ) : (
        <p className="font-normal w-full">{content}</p>
      )}
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
