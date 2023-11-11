import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Spinner } from '@material-tailwind/react'
import { type FC } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useMutation } from 'react-query'
import * as yup from 'yup'
import { signUpFn } from '~/api/authApi'
import type { SignUpFormData } from '~/resources/interfaces/auth.interface'
import { showToast } from '~/utils/toast'
import Input from '../UI/Input'

const schema = yup
  .object({
    password: yup
      .string()
      .min(6, 'The password must have at least 6 characters')
      .required('Please enter your password'),
    confirmPassword: yup
      .string()
      .required('Please confirm your password')
      .test('isEqual', 'Password does not match', (value, testContext) => {
        if (testContext.parent.password !== value) return false
        return true
      }),
    displayName: yup.string().required('Please enter your full name'),
    email: yup
      .string()
      .email('Invalid email')
      .required('Please enter your email'),
  })
  .required()

const RegisterForm: FC = () => {
  const { mutate: signUp, isLoading } = useMutation(
    async (data: SignUpFormData) => await signUpFn(data),
    {
      onSuccess(data) {
        console.log(data)
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
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    signUp(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex flex-col gap-4"
    >
      <Input
        name="displayName"
        label="Full name"
        register={register}
        fieldError={errors.displayName}
      />
      <Input
        name="email"
        type="email"
        label="Email"
        register={register}
        fieldError={errors.email}
      />
      <Input
        name="password"
        type="password"
        label="Password"
        register={register}
        fieldError={errors.password}
      />
      <Input
        name="confirmPassword"
        type="password"
        label="Confirm password"
        register={register}
        fieldError={errors.confirmPassword}
      />
      <Button
        type="submit"
        size="lg"
        color="cyan"
        variant="gradient"
        disabled={isLoading}
        className="flex justify-center"
      >
        {isLoading ? <Spinner color="cyan" /> : 'Sign Up'}
      </Button>
    </form>
  )
}

export default RegisterForm
