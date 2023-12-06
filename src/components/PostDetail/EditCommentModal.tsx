import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Card,
  CardBody,
  Dialog,
  Typography,
} from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import { useEffect, type FC } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { io } from 'socket.io-client'
import * as yup from 'yup'
import { DOMAIN_NAME } from '~/api/apiUrls'
import type {
  IComment,
  ICommentFormData,
} from '~/resources/interfaces/comment.interface'
import Editor from '../Shared/Editor'
import ErrorWrapper from '../UI/ErrorWrapper'

interface EditCommentModalProps {
  open: boolean
  handler: () => void
  selectedComment: IComment
}

const schema = yup
  .object({
    description: yup.string().required('Please enter tag name'),
  })
  .required()

const EditCommentModal: FC<EditCommentModalProps> = ({
  open,
  handler,
  selectedComment,
}) => {
  const session = useSession()

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<ICommentFormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<ICommentFormData> = async (data) => {
    const socket = io(DOMAIN_NAME ?? '', {
      extraHeaders: {
        Authorization: `Bearer ${session.data?.user?.access_token}`,
      },
    })
    socket.emit('updateComment', {
      commentId: selectedComment._id,
      description: data.description,
    })
  }

  useEffect(() => {
    if (selectedComment) {
      setValue('description', selectedComment.description)
    }
  }, [selectedComment, setValue])

  return (
    <Dialog
      size="xl"
      open={open}
      handler={handler}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-3xl">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            Edit comment
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <ErrorWrapper fieldError={errors.description?.message}>
              <Editor
                value={getValues('description')}
                onChange={(value) => {
                  setValue('description', value)
                }}
                placeholder="Enter description here"
              />
            </ErrorWrapper>
            <Button
              type="submit"
              variant="gradient"
              fullWidth
              color="cyan"
              className="flex justify-center"
            >
              Confirm
            </Button>
          </form>
        </CardBody>
      </Card>
    </Dialog>
  )
}

export default EditCommentModal
