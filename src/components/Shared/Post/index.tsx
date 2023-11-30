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
  CardBody,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@material-tailwind/react'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState, type FC } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { deletePostFn } from '~/api/postApi'
import type { IPost } from '~/resources/interfaces/post.interface'
import { printNumberWithCommas } from '~/utils/printNumberWithCommas'
import { getChipColorByTopic } from '~/utils/theme'
import { showToast } from '~/utils/toast'
import ConfirmModal from '../ConfirmModal'
import PostOptions from './PostOptions'
import ReportModal from './ReportModal'

interface PostProps {
  post: IPost
}

const Post: FC<PostProps> = ({ post }) => {
  const session = useSession()
  const queryClient = useQueryClient()
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)
  const [openReportModal, setOpenReportModal] = useState<boolean>(false)

  const handleToggleConfirmModal = (): void => {
    setOpenConfirmModal((prev) => !prev)
  }

  const handleToggleReportModal = (): void => {
    setOpenReportModal((prev) => !prev)
  }

  const { mutate: deletePost } = useMutation(
    async () =>
      await deletePostFn({
        jwt: session.data?.user.access_token ?? '',
        id: post?._id ?? '',
      }),
    {
      onSuccess() {
        showToast('success', 'Deleted post successfully')
        handleToggleConfirmModal()
        queryClient.invalidateQueries('posts')
      },
      onError(error: any) {
        showToast('error', error.response.data.message)
      },
    }
  )

  return (
    <>
      <Card className="shadow">
        <CardBody className="flex flex-col gap-4">
          <div className="flex items-start gap-2">
            <Avatar src="/images/user.png" />
            <div className="flex flex-1 flex-col">
              <Typography className="font-semibold">
                {post.author.displayName}
              </Typography>
              <Typography variant="small">
                {dayjs(post.createdAt).format('hh:mm - DD/MM/YYYY')}
              </Typography>
            </div>

            {session.data?.user.user._id === post.author._id ? (
              <>
                <Link href={`/posts/edit/${post.slug}`}>
                  <Tooltip content="Edit post">
                    <IconButton color="cyan">
                      <PencilSquareIcon className="h-5 w-5" />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Tooltip content="Delete post">
                  <IconButton color="pink" onClick={handleToggleConfirmModal}>
                    <TrashIcon className="h-5 w-5" />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <PostOptions postId={post._id} />
            )}
          </div>
          <Link href={`/posts/${post.slug}`}>
            <Typography variant="h6" className="font-semibold">
              {post.title}
            </Typography>
          </Link>
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
                <Chip
                  value={post.views ?? 0}
                  variant="ghost"
                  icon={<EyeIcon />}
                />
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
        </CardBody>
        <ReportModal open={openReportModal} setOpen={handleToggleReportModal} />
      </Card>
      <ConfirmModal
        message="You really want to delete the post?"
        open={openConfirmModal}
        handler={handleToggleConfirmModal}
        action={deletePost}
      />
    </>
  )
}

export default Post
