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
import { useMutation, useQueryClient } from 'react-query'
import * as yup from 'yup'
import { createTagFn, updateTagFn } from '~/api/tagApi'
import type { ITag, ITagFormData } from '~/resources/interfaces/tag.interface'
import { showToast } from '~/utils/toast'
import Input from '../UI/Input'
import Loading from '../UI/Loading'

interface CreateAndEditTagModalProps {
  type?: 'create' | 'edit'
  open: boolean
  handler: () => void
  selectedTag?: ITag
}

const schema = yup
  .object({
    name: yup.string().required('Please enter tag name'),
  })
  .required()

const CreateAndEditTagModal: FC<CreateAndEditTagModalProps> = ({
  type = 'create',
  open,
  handler,
  selectedTag,
}) => {
  const session = useSession()
  const queryClient = useQueryClient()

  const { mutate: createTag, isLoading: isLoadingCreateTag } = useMutation(
    async (data: ITagFormData) =>
      await createTagFn({ jwt: session.data?.user.access_token ?? '', data }),
    {
      onSuccess(data) {
        showToast('success', 'Created tag successfully')
        queryClient.invalidateQueries('tags')
        handler()
      },
      onError(error: any) {
        showToast('error', error.response.data.message)
      },
    }
  )

  const { mutate: updateTag, isLoading: isLoadingEditTag } = useMutation(
    async (data: ITagFormData) =>
      await updateTagFn({
        jwt: session.data?.user.access_token ?? '',
        data,
        id: selectedTag?._id ?? '',
      }),
    {
      onSuccess() {
        showToast('success', 'Updated tag successfully')
        queryClient.invalidateQueries('tags')
        handler()
      },
      onError(error: any) {
        showToast('error', error.response.data.message)
      },
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ITagFormData>({
    resolver: yupResolver(schema),
    defaultValues: { ...selectedTag },
  })

  const onSubmit: SubmitHandler<ITagFormData> = async (data) => {
    if (type === 'create') createTag(data)
    else updateTag(data)
  }

  useEffect(() => {
    if (selectedTag) {
      setValue('name', selectedTag.name)
    }
  }, [selectedTag, setValue])

  return (
    <Dialog
      size="xs"
      open={open}
      handler={handler}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            {type === 'create' ? 'Create tag' : 'Edit tag'}
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              name="name"
              type="name"
              label="Tag name"
              register={register}
              fieldError={errors.name}
            />
            <Button
              type="submit"
              variant="gradient"
              fullWidth
              color="cyan"
              className="flex justify-center"
            >
              {isLoadingCreateTag || isLoadingEditTag ? (
                <Loading size="sm" />
              ) : type === 'create' ? (
                'Create'
              ) : (
                'Confirm'
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </Dialog>
  )
}

export default CreateAndEditTagModal
