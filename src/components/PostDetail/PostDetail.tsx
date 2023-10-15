import {
  ChatBubbleBottomCenterIcon,
  CheckBadgeIcon,
  EyeIcon,
  GiftIcon,
} from '@heroicons/react/24/outline'
import {
  Avatar,
  Card,
  Chip,
  Tooltip,
  Typography,
} from '@material-tailwind/react'
import Link from 'next/link'
import { type FC } from 'react'

const PostDetail: FC = () => {
  return (
    <Card className="flex flex-col gap-4 p-6 shadow">
      <div className="flex items-start gap-2">
        <Avatar
          variant="circular"
          alt="avatar"
          size="sm"
          className="h-10 w-10 cursor-pointer"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        />
        <div className="flex flex-col">
          <Typography className="font-semibold leading-5">Phú Quang</Typography>
          <Typography variant="small">11:30 - 15/10/2023</Typography>
        </div>
      </div>
      <Typography variant="lead" className="font-semibold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
        laboriosam?
      </Typography>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Link href="/">
            <Chip value="reactjs" variant="ghost" />
          </Link>
          <Link href="/">
            <Chip value="javascript" variant="ghost" />
          </Link>
          <Link href="/">
            <Chip value="nextjs" variant="ghost" />
          </Link>
        </div>
        <div className="flex gap-2">
          <Tooltip content="Bounty">
            <Chip color="cyan" value="50.000 VNĐ" icon={<GiftIcon />} />
          </Tooltip>
          <Tooltip content="Category">
            <Chip value="Bug" color="pink" size="lg" />
          </Tooltip>
          <Tooltip content="Answered">
            <Chip
              value="Answered"
              variant="filled"
              color="green"
              icon={<CheckBadgeIcon />}
            />
          </Tooltip>
          <Tooltip content="Views">
            <Chip value="40" variant="ghost" icon={<EyeIcon />} />
          </Tooltip>
          <Tooltip content="Answers">
            <Chip
              value="4"
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
