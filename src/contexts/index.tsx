import { type FC, type ReactNode } from 'react'
import { MessageContextProvider } from './message'

interface RootContextProps {
  children: ReactNode
}

const RootContext: FC<RootContextProps> = ({ children }) => {
  return <MessageContextProvider>{children}</MessageContextProvider>
}

export default RootContext
