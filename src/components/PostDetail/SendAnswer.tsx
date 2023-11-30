import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, Typography } from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import { type FC } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import io from 'socket.io-client'
import * as yup from 'yup'
import { DOMAIN_NAME } from '~/api/apiUrls'
import type { ICommentFormData } from '~/resources/interfaces/comment.interface'
import Editor from '../Shared/Editor'
import ErrorWrapper from '../UI/ErrorWrapper'

interface SendAnswerProps {
  postId: string
}

const schema = yup
  .object({
    description: yup.string().required('Please enter comment'),
    postId: yup.string().required(),
  })
  .required()

const SendAnswer: FC<SendAnswerProps> = ({ postId }) => {
  const session = useSession()
  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ICommentFormData>({
    defaultValues: { postId },
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<ICommentFormData> = async (data) => {
    const socket = io(DOMAIN_NAME ?? '', {
      extraHeaders: {
        Authorization: `Bearer ${session.data?.user?.access_token}`,
      },
    })
    socket.emit('commentOnPost', data)
  }

  return (
    <Card className="flex flex-col gap-4 p-6 shadow">
      <Typography variant="h6">Your Answer</Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <ErrorWrapper fieldError={errors.description?.message}>
          <Editor
            value={getValues('description')}
            onChange={(value) => {
              setValue('description', value)
            }}
          />
        </ErrorWrapper>
        <Button
          type="submit"
          color="cyan"
          variant="gradient"
          className="self-end"
        >
          Post your answer
        </Button>
      </form>
    </Card>
  )
}

export default SendAnswer
