import { type FC } from 'react'
import type { IMessage } from '~/resources/interfaces/chat.interface'
import MessageContainer from './MessageContainer'
import MessageContent from './MessageContent'

interface Props {
  type?: 'default' | 'other'
  message: IMessage
}

const Message: FC<Props> = ({ type = 'default', message }) => {
  return (
    <MessageContainer message={message} type={type}>
      <MessageContent message={message} type={type} />
    </MessageContainer>
  )
}

export default Message
