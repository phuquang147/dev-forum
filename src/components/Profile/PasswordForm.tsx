import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, Typography } from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import { type FC } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useMutation } from 'react-query'
import * as yup from 'yup'
import { updatePasswordFn } from '~/api/authApi'
import type { IPasswordFormData } from '~/resources/interfaces/auth.interface'
import { showToast } from '~/utils/toast'
import Input from '../UI/Input'
import Loading from '../UI/Loading'

const schema = yup
  .object({
    currentPassword: yup.string().required('Please enter current password'),
    newPassword: yup.string().required('Please enter new password'),
    confirmNewPassword: yup.string().required('Please confirm new password'),
  })
  .required()

const PasswordForm: FC = () => {
  const session = useSession()

  const { mutate: updatePassword, isLoading } = useMutation(
    async (data: IPasswordFormData) =>
      await updatePasswordFn({
        jwt: session.data?.user.access_token ?? '',
        data,
      }),
    {
      onSuccess() {
        showToast('success', 'Updated password successfully')
        reset()
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
    reset,
  } = useForm<IPasswordFormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<IPasswordFormData> = (data) => {
    console.log(data)
    updatePassword(data)
  }

  return (
    <Card className="flex flex-col gap-4 p-6 shadow">
      <Typography className="font-semibold">Password</Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          name="currentPassword"
          label="Old password"
          color="cyan"
          size="lg"
          register={register}
          fieldError={errors.currentPassword}
        />
        <Input
          name="newPassword"
          label="New password"
          color="cyan"
          size="lg"
          register={register}
          fieldError={errors.newPassword}
        />
        <Input
          name="confirmNewPassword"
          label="Confirm new password"
          color="cyan"
          size="lg"
          register={register}
          fieldError={errors.confirmNewPassword}
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

export default PasswordForm
