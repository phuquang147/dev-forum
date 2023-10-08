import { Button, Input } from '@material-tailwind/react'
import type { FC } from 'react'

const RegisterForm: FC = () => {
  return (
    <form className="mt-6 flex flex-col gap-4">
      <Input crossOrigin="" label="Họ và tên" size="lg" color="cyan" />
      <Input crossOrigin="" type="email" label="Email" size="lg" color="cyan" />
      <Input crossOrigin="" label="Tên đăng nhập" size="lg" color="cyan" />
      <Input
        crossOrigin=""
        type="password"
        label="Mật khẩu"
        size="lg"
        color="cyan"
      />
      <Input
        crossOrigin=""
        type="password"
        label="Xác nhận mật khẩu"
        size="lg"
      />
      <Button size="lg" color="cyan" variant="gradient">
        Đăng ký
      </Button>
    </form>
  )
}

export default RegisterForm
