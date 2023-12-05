import { type Timestamp } from 'firebase/firestore'
import type { TMessageType } from '../types/chat.type'

export interface IRoom {
  id: string
  lastMessage: {
    type: TMessageType
    content: string
    createAt: Timestamp
    authorId: string
  }
  user: IFirestoreUser
}

export interface IMessage {
  id?: string
  content: string
  authorId: string
  createdAt: Timestamp
  type: TMessageType
}

export interface IFirestoreUser {
  id: string
  displayName: string
  email: string
  photoURL: string
}
