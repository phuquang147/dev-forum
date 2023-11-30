import {
  ChatBubbleBottomCenterIcon,
  CheckBadgeIcon,
  EyeIcon,
  GiftIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import {
  Avatar,
  Card,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@material-tailwind/react'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { type FC } from 'react'
import type { IPost } from '~/resources/interfaces/post.interface'
import { printNumberWithCommas } from '~/utils/printNumberWithCommas'
import { getChipColorByTopic } from '~/utils/theme'

interface PostDetailProps {
  post: IPost
}

const PostDetail: FC<PostDetailProps> = ({ post }) => {
  const session = useSession()

  return (
    <Card className="flex flex-col gap-4 p-6 shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex gap-2">
          <Avatar
            variant="circular"
            alt="avatar"
            size="sm"
            className="h-10 w-10 cursor-pointer"
            src="/images/user.png"
          />
          <div className="flex flex-col">
            <Typography className="font-semibold leading-5">
              {post.author.displayName}
            </Typography>
            <Typography variant="small">
              {dayjs(post.createdAt).format('hh:mm - DD/MM/YYYY')}
            </Typography>
          </div>
        </div>
        {session.data?.user.user._id === post.author._id && (
          <div className="flex gap-2">
            <Link href={`/posts/edit/${post.slug}`}>
              <Tooltip content="Edit post">
                <IconButton color="cyan">
                  <PencilSquareIcon className="h-5 w-5" />
                </IconButton>
              </Tooltip>
            </Link>
            <Tooltip content="Delete post">
              <IconButton color="pink">
                <TrashIcon className="h-5 w-5" />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </div>
      <Typography variant="lead" className="font-semibold">
        {post.title}
      </Typography>
      <div
        className="ql-editor p-0"
        dangerouslySetInnerHTML={{
          __html: post.description,
        }}
      ></div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {post.tags.map((tag) => (
            <Chip key={tag._id} value={tag.name} variant="ghost" />
          ))}
        </div>
        <div className="flex gap-2">
          {post.bounty && post.bounty > 0 && (
            <Tooltip content="Bounty">
              <Chip
                color="cyan"
                value={`${printNumberWithCommas(post.bounty)} VNĐ`}
                icon={<GiftIcon />}
              />
            </Tooltip>
          )}
          <Tooltip content="Category">
            <Chip
              value={post.topic}
              color={getChipColorByTopic(post.topic)}
              size="lg"
            />
          </Tooltip>
          {post.isAnswered && (
            <Tooltip content="Answered">
              <Chip
                value="Answered"
                variant="filled"
                color="green"
                icon={<CheckBadgeIcon />}
              />
            </Tooltip>
          )}
          <Tooltip content="Views">
            <Chip value={post.views ?? 0} variant="ghost" icon={<EyeIcon />} />
          </Tooltip>
          <Tooltip content="Answers">
            <Chip
              value={post.answerCount ?? 0}
              variant="ghost"
              icon={<ChatBubbleBottomCenterIcon />}
            />
          </Tooltip>
        </div>
      </div>
    </Card>
  )
}

export default PostDetail
