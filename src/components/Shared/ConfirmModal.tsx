import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from '@material-tailwind/react'
import { type FC } from 'react'

interface ConfirmModalProps {
  message: string
  open: boolean
  handler: () => void
  action: () => void
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  message,
  open,
  handler,
  action,
}) => {
  return (
    <Dialog open={open} handler={handler} size="sm">
      <DialogBody>
        <Typography className="text-center font-semibold">{message}</Typography>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="pink" onClick={handler} className="mr-1">
          Cancel
        </Button>
        <Button variant="gradient" color="cyan" onClick={action}>
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

export default ConfirmModal
