import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, Typography } from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import { type FC } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useMutation } from 'react-query'
import * as yup from 'yup'
import { updateProfileFn } from '~/api/authApi'
import type {
  IProfileFormData,
  IUserProfile,
} from '~/resources/interfaces/user.interface'
import { showToast } from '~/utils/toast'
import Input from '../UI/Input'
import Loading from '../UI/Loading'

interface ProfileFormProps {
  profile: IUserProfile | undefined
}

const schema = yup
  .object({
    displayName: yup.string().required('Please enter your name'),
  })
  .required()

const ProfileForm: FC<ProfileFormProps> = ({ profile }) => {
  const session = useSession()

  const { mutate: updateProfile, isLoading } = useMutation(
    async (data: IProfileFormData) =>
      await updateProfileFn({
        jwt: session.data?.user.access_token ?? '',
        data,
      }),
    {
      onSuccess() {
        showToast('success', 'Updated profile successfully')
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
  } = useForm<IProfileFormData>({
    resolver: yupResolver(schema),
    defaultValues: { ...profile },
  })

  const onSubmit: SubmitHandler<IProfileFormData> = (data) => {
    updateProfile(data)
  }

  return (
    <Card className="flex h-fit flex-col gap-4 p-6 shadow">
      <Typography className="font-semibold">Profile</Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Full name"
          color="cyan"
          size="lg"
          name="displayName"
          register={register}
          fieldError={errors.displayName}
        />
        <Input
          label="Description"
          color="cyan"
          size="lg"
          name="description"
          register={register}
          fieldError={errors.description}
        />
        <Button
          type="submit"
          variant="gradient"
          color="cyan"
          className="self-end"
        >
          {isLoading ? <Loading size="sm" /> : 'Save'}
        </Button>
      </form>
    </Card>
  )
}

export default ProfileForm
