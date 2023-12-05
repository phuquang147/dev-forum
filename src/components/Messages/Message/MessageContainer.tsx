import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from '@material-tailwind/react'
import { useState, type FC } from 'react'
import type { IMessage } from '~/resources/interfaces/chat.interface'
import MessageMenu from './MessageMenu'

interface MessageContainerProps {
  type: 'default' | 'other'
  message: IMessage
  children: JSX.Element | string | undefined
}

const MessageContainer: FC<MessageContainerProps> = ({
  type = 'default',
  message,
  children,
}) => {
  const [menuVisible, setMenuVisible] = useState(false)

  const handleToggleMenu = (): void => {
    setMenuVisible((prev) => !prev)
  }

  return type === 'default' ? (
    <div className="group mr-4 mt-4 flex flex-1 items-center justify-end">
      <Popover placement="bottom">
        <PopoverHandler>
          <div>
            <button
              className={`mr-2 rounded-full p-2 text-xl hover:bg-gray-200 active:bg-gray-300 group-hover:inline-block ${
                menuVisible ? 'inline-block' : 'hidden'
              }`}
              onClick={handleToggleMenu}
            >
              <EllipsisHorizontalIcon className="h-4 w-4" />
            </button>
          </div>
        </PopoverHandler>
        <PopoverContent className="p-2">
          <MessageMenu message={message} />
        </PopoverContent>
      </Popover>

      <div
        className={`inline-block w-fit max-w-[80%] rounded-l-2xl rounded-tr-2xl border border-gray-300 bg-white ${
          message.type === 'text' ? 'p-4' : 'p-0'
        }`}
      >
        {children}
      </div>
    </div>
  ) : (
    <div
      className={`ml-4 mt-4 w-fit max-w-[80%] self-start rounded-r-2xl rounded-tl-2xl bg-gray-200 ${
        message.type === 'text' ? 'p-4' : 'p-0'
      }`}
    >
      {children}
    </div>
  )
}

export default MessageContainer
