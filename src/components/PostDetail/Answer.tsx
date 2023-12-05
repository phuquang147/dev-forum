import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import {
  Avatar,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import { useState, type FC } from 'react'
import { io } from 'socket.io-client'
import { DOMAIN_NAME } from '~/api/apiUrls'
import type { IComment } from '~/resources/interfaces/comment.interface'
import ConfirmModal from '../Shared/ConfirmModal'
import EditCommentModal from './EditCommentModal'
import Replies from './Replies'

interface AnswerProps {
  comment: IComment
  isMainAnswer?: boolean
}

const Answer: FC<AnswerProps> = ({ comment, isMainAnswer = true }) => {
  const session = useSession()
  const [showReplies, setShowReplies] = useState<boolean>(false)
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)
  const [openEditCommentModal, setOpenEditCommentModal] =
    useState<boolean>(false)

  const handleToggleConfirmModal = (): void => {
    setOpenConfirmModal((prev) => !prev)
  }

  const handleToggleEditCommentModal = (): void => {
    setOpenEditCommentModal((prev) => !prev)
  }

  const handleToggleShowReplies = (): void => {
    setShowReplies((prev) => !prev)
  }

  const handleDeleteComment = (): void => {
    const socket = io(DOMAIN_NAME ?? '', {
      extraHeaders: {
        Authorization: `Bearer ${session.data?.user?.access_token}`,
      },
    })
    socket.emit('deleteComment', { commentId: comment._id })
  }

  return (
    <div className="flex w-full gap-4">
      <div className="flex flex-col items-center">
        <IconButton className="rounded-full" variant="text" color="cyan">
          <ChevronUpIcon className="h-5 w-5" />
        </IconButton>
        <Typography>{comment.score}</Typography>
        <IconButton className="rounded-full" variant="text" color="red">
          <ChevronDownIcon className="h-5 w-5" />
        </IconButton>
        <Tooltip content="Best answer">
          <CheckCircleIcon className="h-8 w-8 text-cyan-500" />
        </Tooltip>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex gap-2">
            <Avatar
              variant="circular"
              alt="avatar"
              size="sm"
              className="h-10 w-10 cursor-pointer"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <div className="flex flex-col">
              <Typography className="font-semibold leading-5">
                {comment.author.displayName}
              </Typography>
              <Typography variant="small">11:30 - 15/10/2023</Typography>
            </div>
          </div>
          {session.data?.user.user._id === comment.author._id && (
            <div className="flex gap-2">
              <Tooltip content="Edit comment">
                <IconButton color="cyan" onClick={handleToggleEditCommentModal}>
                  <PencilSquareIcon className="h-5 w-5" />
                </IconButton>
              </Tooltip>
              <Tooltip content="Delete comment">
                <IconButton color="pink" onClick={handleToggleConfirmModal}>
                  <TrashIcon className="h-5 w-5" />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>
        <div
          className="ql-editor p-0"
          dangerouslySetInnerHTML={{
            __html: comment.description,
          }}
        ></div>
        {isMainAnswer && (
          <div className="flex self-end">
            <Button variant="text" color="cyan" className="self-end">
              Reply
            </Button>
            <Button
              variant="text"
              color="cyan"
              className="flex items-center gap-1 self-end"
              onClick={handleToggleShowReplies}
            >
              <ChevronDownIcon className="h-5 w-5" />
              Show Replies (5)
            </Button>
          </div>
        )}
        {showReplies && <Replies />}
      </div>
      <ConfirmModal
        message="You really want to delete this comment?"
        open={openConfirmModal}
        handler={handleToggleConfirmModal}
        action={handleDeleteComment}
      />
      <EditCommentModal
        open={openEditCommentModal}
        handler={handleToggleEditCommentModal}
        selectedComment={comment}
      />
    </div>
  )
}

export default Answer
