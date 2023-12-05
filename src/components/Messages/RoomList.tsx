import { PlusIcon } from '@heroicons/react/24/outline'
import { Button } from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import { useEffect, useState, type FC } from 'react'
import { db } from '~/firebase/config'
import type {
  IFirestoreUser,
  IRoom,
} from '~/resources/interfaces/chat.interface'
import NewRoomModal from './NewRoomModal'
import Room from './Room'

const RoomList: FC = () => {
  const session = useSession()
  const [rooms, setRooms] = useState<IRoom[]>([])
  const [openNewRoomModal, setOpenNewRoomModal] = useState<boolean>(false)

  const handleToggleNewRoomModal = (): void => {
    setOpenNewRoomModal((prev) => !prev)
  }

  useEffect(() => {
    let unsubscribeRoomList = (): void => {}
    unsubscribeRoomList = db.collection('rooms').onSnapshot((snapshot) => {
      Promise.all(
        snapshot.docs.map(async (room) => {
          const roomData = room.data() as any

          const user = (
            await db
              .collection('users')
              .doc(
                roomData.members[0] === session.data?.user.user._id
                  ? roomData.members[1]
                  : roomData.members[0]
              )
              .get()
          ).data() as IFirestoreUser

          const combinedData: IRoom = {
            id: room.id,
            ...roomData,
            user,
          }

          return combinedData
        })
      ).then((combinedRooms) => {
        setRooms(combinedRooms)
      })
    })

    return () => {
      unsubscribeRoomList()
    }
  }, [session.data?.user.user._id])

  return (
    <div className="col-span-3 flex h-full flex-col gap-4 overflow-auto">
      <Button
        fullWidth
        color="cyan"
        className="flex items-center gap-2"
        onClick={handleToggleNewRoomModal}
      >
        <PlusIcon className="h-5 w-5" />
        New chat
      </Button>
      {rooms?.map((room: any) => (
        <Room key={room.id} room={room} />
      ))}
      <NewRoomModal
        open={openNewRoomModal}
        handler={handleToggleNewRoomModal}
      />
    </div>
  )
}

export default RoomList
