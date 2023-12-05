import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {
  FaceSmileIcon,
  PaperAirplaneIcon,
  PhotoIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from '@material-tailwind/react'
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  type UploadResult,
} from 'firebase/storage'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState, type ChangeEvent, type FC } from 'react'
import { toast } from 'react-hot-toast'
import { db } from '~/firebase/config'
import createMessage from '~/firebase/utils/createMessage'
import type { TMessageType } from '~/resources/types/chat.type'

interface InputMessageProps {
  selectedRoom: any
}

const InputMessage: FC<InputMessageProps> = ({ selectedRoom }) => {
  const session = useSession()
  const storage = getStorage()
  const [image, setImage] = useState('')
  const [imageSnapshot, setImageSnapshot] = useState<UploadResult>()
  const [message, setMessage] = useState<string>('')
  const [messageType, setMessageType] = useState<TMessageType>('text')
  const [disableSendButton, setDisableSendButton] = useState<boolean>(false)

  const newMessage = (): void => {
    const userId = session.data?.user.user._id ?? ''

    if (message.length > 0) {
      let newMessage
      if (messageType === 'text') {
        newMessage = createMessage(message, userId, messageType)
      } else {
        newMessage = createMessage(image, userId, messageType)
      }

      db.collection('rooms')
        .doc(selectedRoom.id)
        .collection('messages')
        .add(newMessage)
        .then(() => {
          setMessage('')
          setImage('')
          setMessageType('text')
        })

      db.collection('rooms').doc(selectedRoom.id).update({
        lastMessage: newMessage,
      })
    }
  }

  const appendEmoji = (emoji: any): void => {
    setMessage((prev) => prev + emoji.native)
  }

  const onImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const maxImageSize = 1000000

    if (event.target.files?.[0]) {
      if (event.target.files[0].size <= maxImageSize) {
        setImage('/assets/images/loading.svg')
        setDisableSendButton(true)
        const storageRef = ref(storage, `images/${event.target.files[0].name}`)

        uploadBytes(storageRef, event.target.files[0]).then(
          (snapshot: UploadResult) => {
            setMessageType('image')
            setImageSnapshot(snapshot)
            getDownloadURL(snapshot.ref).then((link) => {
              setImage(link)
              setMessage(link)
              setDisableSendButton(false)
            })
          }
        )
      } else toast.error('File size must be less then or equal to 1MB')
    }
  }

  const handleCancelImage = (): void => {
    if (imageSnapshot) {
      deleteObject(imageSnapshot.ref).then(() => {
        setImage('')
        setMessage('')
        setImageSnapshot(undefined)
        setMessageType('text')
      })
    }
  }

  return (
    <div className="dark:bg-blue-gray flex gap-2 p-4 transition-colors duration-300">
      <div className="dark:bg-light-blue-gray group flex flex-1 items-center justify-center rounded-full bg-white text-gray-600 outline-none focus:ring-1 group-hover:ring-gray-300">
        {messageType === 'text' ? (
          <>
            <input
              placeholder="Type message..."
              className="h-full flex-1 rounded-lg border border-gray-200 bg-transparent px-6 py-4 outline-none dark:text-gray-100"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value.toString())
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') newMessage()
              }}
            />

            <label
              htmlFor="imageMessage"
              className="active:bg-primary border-3px mr-1 cursor-pointer rounded-full bg-white hover:bg-cyan-50 hover:bg-opacity-50 active:bg-opacity-70"
            >
              <div className="rounded-md p-4 text-2xl hover:bg-cyan-50">
                <PhotoIcon className="h-7 w-7 text-cyan-500" />
              </div>
              <input
                id="imageMessage"
                type="file"
                className="hidden opacity-0"
                accept="image/*"
                onChange={(e) => {
                  onImageChange(e)
                }}
              />
            </label>

            <Popover placement="top-end">
              <PopoverHandler>
                <Button variant="text" color="cyan" className="h-full">
                  <FaceSmileIcon className="h-7 w-7" />
                </Button>
              </PopoverHandler>
              <PopoverContent className="z-[999] p-0">
                <Picker
                  data={data}
                  onEmojiSelect={(emoji: any) => {
                    appendEmoji(emoji)
                  }}
                  theme={localStorage.theme}
                  className="z-[999]"
                />
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <div className="flex h-full flex-1 items-center gap-2 px-6">
            <div className="relative h-12 w-12 rounded-lg object-contain">
              <Image src={image} alt="avatar" fill objectFit="contain" />
            </div>
            <button
              className="ml-2 h-12 w-12 text-xl text-red-500"
              onClick={handleCancelImage}
            >
              <XCircleIcon className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>

      <Button
        disabled={disableSendButton}
        variant="filled"
        color="cyan"
        onClick={newMessage}
        className="h-full"
      >
        <PaperAirplaneIcon className="h-6 w-6" />
      </Button>
    </div>
  )
}

export default InputMessage
