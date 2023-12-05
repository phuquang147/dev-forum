import { useSession } from 'next-auth/react'
import { useEffect, useState, type FC, useRef } from 'react'
import { useMessageContext } from '~/contexts/message'
import { db } from '~/firebase/config'
import type { IMessage } from '~/resources/interfaces/chat.interface'
import Message from './Message'

const MessageList: FC = () => {
  const session = useSession()
  const userId = session.data?.user.user._id ?? ''
  const { selectedRoom, onChangeSelectedRoom } = useMessageContext()
  const [messages, setMessages] = useState<IMessage[]>([])
  const anchorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let unsubscribeMessage = (): void => {}

    if (selectedRoom) {
      unsubscribeMessage = db
        .collection('rooms')
        .doc(selectedRoom.id)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {
          const messages = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            }
          })
          setMessages(messages as IMessage[])
        })
    }

    return () => {
      unsubscribeMessage()
    }
  }, [selectedRoom, onChangeSelectedRoom])

  useEffect(() => {
    if (anchorRef.current) {
      console.log('scroll')
      anchorRef.current.scrollIntoView()
    }
  }, [messages])

  return (
    <div className="flex w-full flex-col-reverse overflow-auto">
      <div ref={anchorRef}> </div>
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          type={message.authorId !== userId ? 'other' : 'default'}
        />
      ))}
    </div>
  )
}

export default MessageList
