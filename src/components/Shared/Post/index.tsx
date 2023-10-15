import {
  ChatBubbleBottomCenterIcon,
  CheckBadgeIcon,
  EyeIcon,
  GiftIcon,
} from '@heroicons/react/24/outline'
import {
  Avatar,
  Card,
  CardBody,
  Chip,
  Tooltip,
  Typography,
} from '@material-tailwind/react'
import Link from 'next/link'
import { useState, type FC } from 'react'
import PostOptions from './PostOptions'
import ReportModal from './ReportModal'

const Post: FC = () => {
  const [openReportModal, setOpenReportModal] = useState<boolean>(false)

  const handleUpdateOpenReportModal = (open: boolean): void => {
    setOpenReportModal(open)
  }

  return (
    <Card className="shadow">
      <CardBody className="flex flex-col gap-4">
        <div className="flex items-start gap-2">
          <Avatar src="/images/profile.png" />
          <div className="flex flex-1 flex-col">
            <Typography className="font-semibold">Phu Quang</Typography>
            <Typography variant="small">14/07/2002 - 19h50</Typography>
          </div>
          <PostOptions onUpdateOpenReportModal={handleUpdateOpenReportModal} />
        </div>
        <Link href="/posts/slug">
          <Typography variant="h6" className="font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repellendus, laboriosam?
          </Typography>
        </Link>
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
      </CardBody>
      <ReportModal
        open={openReportModal}
        setOpen={handleUpdateOpenReportModal}
      />
    </Card>
  )
}

export default Post
