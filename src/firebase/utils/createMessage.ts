import type { Timestamp } from 'firebase/firestore'
import firebase from '~/firebase/config'
import type { IMessage } from '~/resources/interfaces/chat.interface'
import type { TMessageType } from '~/resources/types/chat.type'

const createMessage = (
  content: string,
  user: string,
  type: TMessageType
): IMessage => ({
  content,
  authorId: user,
  type,
  createdAt: firebase.firestore.FieldValue.serverTimestamp() as Timestamp,
})

export default createMessage
