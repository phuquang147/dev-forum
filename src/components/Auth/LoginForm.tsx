import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@material-tailwind/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import type { LoginFormData } from '~/resources/interfaces/auth.interface'
import { showToast } from '~/utils/toast'
import Input from '../UI/Input'

const schema = yup
  .object({
    email: yup.string().required('Please enter your email'),
    password: yup.string().required('Please enter your password'),
  })
  .required()

const LoginForm: FC = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then((res) => {
      if (res?.ok) {
        router.push('/')
      } else {
        showToast('error', 'Sai tên đăng nhập hoặc mật khẩu!')
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex flex-col gap-4"
    >
      <Input
        name="email"
        label="Email"
        register={register}
        fieldError={errors.email}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        register={register}
        fieldError={errors.password}
      />
      <Button type="submit" size="lg" color="cyan" variant="gradient">
        Sign In
      </Button>
    </form>
  )
}

export default LoginForm
