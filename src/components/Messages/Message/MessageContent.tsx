/* eslint-disable @next/next/no-img-element */
import { type FC, useState } from 'react'
import Loading from '~/components/UI/Loading'
import type { IMessage } from '~/resources/interfaces/chat.interface'

interface MessageContentProps {
  message: IMessage
  type: 'default' | 'other'
}

const MessageContent: FC<MessageContentProps> = ({
  message,
  type = 'default',
}) => {
  const [loaded, setLoaded] = useState<boolean>(false)

  return message.type && message.type === 'image' ? (
    <>
      {loaded ? null : <Loading />}
      <img
        src={message.content}
        alt=""
        className={`${loaded || 'none'} ${
          type === 'default'
            ? 'rounded-l-2xl rounded-tr-2xl '
            : 'rounded-r-2xl rounded-tl-2xl'
        }`}
        onLoad={() => {
          setLoaded(true)
        }}
      />
    </>
  ) : (
    <span>{message.content}</span>
  )
}

export default MessageContent
