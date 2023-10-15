import {
  Button,
  Card,
  CardBody,
  Dialog,
  Input,
  Textarea,
  Typography,
} from '@material-tailwind/react'
import { type FC } from 'react'

interface ReportModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const ReportModal: FC<ReportModalProps> = ({ open, setOpen }) => {
  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={setOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="relative mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-6">
            <Typography className="text-center font-semibold">
              Report Post
            </Typography>
            <form className="flex flex-col gap-4">
              <Input
                crossOrigin=""
                label="Title"
                size="lg"
                color="cyan"
                disabled
                value="Post title"
              />
              <Input crossOrigin="" label="Title" size="lg" color="cyan" />
              <Textarea label="Details" size="lg" color="cyan" />
              <Button color="pink">Send Report</Button>
            </form>
          </CardBody>
        </Card>
      </Dialog>
    </>
  )
}

export default ReportModal
