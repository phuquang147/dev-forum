import { Card } from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import { useEffect, useState, type FC } from 'react'
import { io, type Socket } from 'socket.io-client'
import { DOMAIN_NAME } from '~/api/apiUrls'
import type {
  IComment,
  IPostDetail,
} from '~/resources/interfaces/post.interface'
import Answer from './Answer'

interface AnswersProps {
  postDetail: IPostDetail
}

const Answers: FC<AnswersProps> = ({ postDetail }) => {
  const session = useSession()
  const [comments, setComments] = useState<IComment[]>([])

  useEffect(() => {
    setComments(postDetail.comments)
  }, [postDetail.comments])

  useEffect(() => {
    let socket: Socket
    if (session.data?.user?.access_token) {
      socket = io(DOMAIN_NAME ?? '', {
        extraHeaders: {
          Authorization: session.data?.user?.access_token
            ? `Bearer ${session.data?.user?.access_token}`
            : '',
        },
      })
      socket.connect()
      socket.emit('joinPostRoom', { postId: postDetail.post._id })
      socket.on('updatePost', (data: IPostDetail) => {
        setComments(data.comments)
      })
    }

    return () => {
      socket?.off('updatePost')
      socket?.disconnect()
    }
  }, [postDetail.post._id, session])

  return comments.length > 0 ? (
    <Card className="flex flex-col items-center gap-4 p-6 shadow">
      {comments.map((comment, index) => (
        <>
          <Answer comment={comment} key={comment._id} />
          {index < comments.length - 1 && <hr className="w-full" />}
        </>
      ))}

      {/* <Pagination /> */}
    </Card>
  ) : null
}

export default Answers
