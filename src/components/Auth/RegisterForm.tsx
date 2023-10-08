import { Button, Input } from '@material-tailwind/react'
import type { FC } from 'react'

const RegisterForm: FC = () => {
  return (
    <form className="mt-6 flex flex-col gap-4">
      <Input crossOrigin="" label="Full name" size="lg" color="cyan" />
      <Input crossOrigin="" type="email" label="Email" size="lg" color="cyan" />
      <Input crossOrigin="" label="Username" size="lg" color="cyan" />
      <Input
        crossOrigin=""
        type="password"
        label="Password"
        size="lg"
        color="cyan"
      />
      <Input
        crossOrigin=""
        type="password"
        label="Confirm password"
        size="lg"
      />
      <Button size="lg" color="cyan" variant="gradient">
        Sign Up
      </Button>
    </form>
  )
}

export default RegisterForm
