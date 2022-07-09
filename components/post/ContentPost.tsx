import { PostResponse } from '../../interfaces'

export const ContentPost = ({ content }: Pick<PostResponse, 'content'>) => {
  return <p className="font-normal my-5">{content}</p>
}
