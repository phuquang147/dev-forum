import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline'
import {
  Avatar,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from '@material-tailwind/react'
import { useState, type FC } from 'react'
import type { IComment } from '~/resources/interfaces/post.interface'
import Replies from './Replies'

interface AnswerProps {
  comment: IComment
  isMainAnswer?: boolean
}

const Answer: FC<AnswerProps> = ({ comment, isMainAnswer = true }) => {
  const [showReplies, setShowReplies] = useState<boolean>(false)

  const handleToggleShowReplies = (): void => {
    setShowReplies((prev) => !prev)
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
        <div className="flex items-start gap-2">
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
    </div>
  )
}

export default Answer
