import { Avatar } from '@material-tailwind/react'
import dayjs from 'dayjs'
import { type FC } from 'react'
import { useMessageContext } from '~/contexts/message'
import type { IRoom } from '~/resources/interfaces/chat.interface'

interface RoomProps {
  room: IRoom
}

const Room: FC<RoomProps> = ({ room }) => {
  const { selectedRoom, onChangeSelectedRoom } = useMessageContext()

  return (
    <div
      className={`flex cursor-pointer border-l-4 border-white p-4 pl-[10px] transition-colors duration-200 hover:border-l-cyan-500 hover:bg-gray-100 ${
        selectedRoom &&
        selectedRoom.id === room.id &&
        'border-l-cyan-500 bg-gray-100'
      }`}
      onClick={() => {
        onChangeSelectedRoom(room)
      }}
    >
      <Avatar src={room.user.photoURL} alt="user avatar" />
      <div className="ml-4 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{room.user.displayName}</p>
          <p className="text-xs font-normal text-gray-500">
            {dayjs(room.lastMessage?.createAt?.toDate().toISOString()).toNow()}
          </p>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-xs">
            {room.lastMessage
              ? room.lastMessage.type === 'text'
                ? room.lastMessage.content
                : 'Photo'
              : '...'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Room
