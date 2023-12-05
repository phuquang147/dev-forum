import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { Avatar } from '@material-tailwind/react'
import { type FC } from 'react'
import { useMessageContext } from '~/contexts/message'
import InputMessage from './InputMessage'
import MessageList from './MessageList'

const ChatWindow: FC = () => {
  const { selectedRoom } = useMessageContext()

  return selectedRoom ? (
    <div className="bg-light-gray border-light-gray col-span-9 flex h-full flex-col border-x transition-colors duration-300">
      <div className="z-30 flex items-center bg-white p-4 shadow">
        <Avatar size="md" src={selectedRoom.user?.photoURL} />
        <p className="ml-4 text-base font-semibold text-gray-800">
          {selectedRoom.user?.displayName}
        </p>
      </div>
      <div className="h-[400px] overflow-auto">
        <MessageList />
      </div>
      <InputMessage selectedRoom={selectedRoom} />
    </div>
  ) : (
    <div className="bg-light-gray col-span-9 flex h-full flex-col items-center justify-center transition-colors duration-200">
      <ChatBubbleLeftRightIcon className="h-20 w-20 text-gray-300" />
      <p className="mt-3 text-lg text-gray-400">Please select chat room</p>
    </div>
  )
}

export default ChatWindow
