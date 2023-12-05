import {
  Avatar,
  Button,
  Card,
  CardBody,
  Dialog,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react'
import firebase from 'firebase/compat/app'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useEffect, useState, type FC } from 'react'
import { useMessageContext } from '~/contexts/message'
import { db } from '~/firebase/config'
import type {
  IFirestoreUser,
  IRoom,
} from '~/resources/interfaces/chat.interface'

interface NewRoomModalProps {
  open: boolean
  handler: () => void
}

const NewRoomModal: FC<NewRoomModalProps> = ({ open, handler }) => {
  const session = useSession()
  const { onChangeSelectedRoom } = useMessageContext()
  const [users, setUsers] = useState<IFirestoreUser[]>()
  const [user, setUser] = useState<string>()

  useEffect(() => {
    let unsubscribeRoomList = (): void => {}
    unsubscribeRoomList = db
      .collection('users')
      .where(
        firebase.firestore.FieldPath.documentId(),
        '!=',
        session.data?.user.user._id
      )
      .onSnapshot((snapshot) => {
        setUsers(
          snapshot.docs.map((room) => {
            return { id: room.id, ...room.data() }
          }) as IFirestoreUser[]
        )
      })

    return () => {
      unsubscribeRoomList()
    }
  }, [session.data?.user.user._id])

  const handleCreateChat = (): void => {
    const query1 = query(
      collection(db, 'rooms'),
      where('members', 'array-contains', user)
    )

    const query2 = query(
      collection(db, 'rooms'),
      where('members', 'array-contains', session.data?.user.user._id)
    )

    Promise.all([getDocs(query1), getDocs(query2)])
      .then(([querySnapshot1, querySnapshot2]) => {
        const rooms1 = querySnapshot1.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as IRoom[]
        const rooms2 = querySnapshot2.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as IRoom[]

        const commonRooms = rooms1.filter((room1) =>
          rooms2.some((room2) => room1.id === room2.id)
        )

        if (commonRooms.length === 0) {
          db.collection('rooms')
            .add({
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              members: [user, session.data?.user.user._id],
            })
            .then(() => {
              handler()
            })
        } else {
          db.doc(`rooms/${commonRooms[0].id}`)
            .get()
            .then((doc) => {
              const room: any = {
                id: doc.id,
                ...doc.data(),
              }

              const userId =
                room.members[0] === session.data?.user.user._id
                  ? room.members[1]
                  : room.members[0]

              db.collection('users')
                .doc(userId)
                .get()
                .then((doc) => {
                  room.user = doc.data()
                  onChangeSelectedRoom(room)
                  handler()
                })
            })
        }
      })
      .catch((error) => {
        console.error('Error getting documents:', error)
      })
  }

  return (
    <Dialog
      size="xs"
      open={open}
      handler={handler}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h6">New chat</Typography>
          <Select
            size="lg"
            label="Select user"
            color="cyan"
            value={user}
            onChange={(value) => {
              setUser(value)
            }}
          >
            {users?.map((user) => (
              <Option key={user.id} value={user.id}>
                <div className="flex items-center gap-2">
                  <Avatar size="xs" src={user.photoURL} />
                  <Typography>{user.displayName}</Typography>
                </div>
              </Option>
            ))}
          </Select>
          <Button variant="gradient" color="cyan" onClick={handleCreateChat}>
            Confirm
          </Button>
        </CardBody>
      </Card>
    </Dialog>
  )
}

export default NewRoomModal
