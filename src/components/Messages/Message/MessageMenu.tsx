import { TrashIcon } from '@heroicons/react/24/outline'
import { IconButton } from '@material-tailwind/react'
import { type FC } from 'react'
import { useMessageContext } from '~/contexts/message'
import { db } from '~/firebase/config'
import type { IMessage } from '~/resources/interfaces/chat.interface'

interface MessageMenuProps {
  message: IMessage
}

const MessageMenu: FC<MessageMenuProps> = ({ message }) => {
  const { selectedRoom } = useMessageContext()

  const handleDeleteMessage = (): void => {
    db.collection('rooms')
      .doc(selectedRoom?.id)
      .collection('messages')
      .doc(message.id)
      .delete()
  }

  return (
    <IconButton variant="text" color="pink" onClick={handleDeleteMessage}>
      <TrashIcon className="h-5 w-5" />
    </IconButton>
  )
}

export default MessageMenu
