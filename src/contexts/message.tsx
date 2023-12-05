import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { IRoom } from '~/resources/interfaces/chat.interface'

interface IMessageContext {
  selectedRoom: IRoom | undefined
  onChangeSelectedRoom: (room: IRoom) => void
}

interface IMessageContextProviderProps {
  children: ReactNode
}

const MessageContext = createContext<IMessageContext>({
  selectedRoom: undefined,
  onChangeSelectedRoom: (room: IRoom) => {},
})

const MessageContextProvider: React.FC<IMessageContextProviderProps> = ({
  children,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<IRoom>()

  const onChangeSelectedRoom = (room: IRoom): void => {
    setSelectedRoom(room)
  }

  const contextValue = useMemo(
    () => ({ selectedRoom, onChangeSelectedRoom }),
    [selectedRoom]
  )

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  )
}

const useMessageContext = (): IMessageContext => {
  const context = useContext(MessageContext)
  if (context === undefined) {
    throw new Error(
      'useMessageContext must be used within a MessageContextProvider'
    )
  }
  return context
}

export { MessageContextProvider, useMessageContext }
