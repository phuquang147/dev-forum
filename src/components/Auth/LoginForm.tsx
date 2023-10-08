import { Button, Input } from '@material-tailwind/react'
import Image from 'next/image'
import type { FC } from 'react'

const LoginForm: FC = () => {
  return (
    <form className="mt-6 flex flex-col gap-4">
      <Input crossOrigin="" label="Tên đăng nhập" color="cyan" size="lg" />
      <Input
        crossOrigin=""
        label="Mật khẩu"
        type="password"
        color="cyan"
        size="lg"
      />
      <Button size="lg" color="cyan" variant="gradient">
        Đăng Nhập
      </Button>
      <Button
        size="lg"
        color="white"
        variant="filled"
        className="flex items-center justify-center gap-3 text-gray-600"
      >
        <Image
          src="/images/google.png"
          alt="google logo"
          width={24}
          height={24}
        />
        Đăng nhập với Google
      </Button>
    </form>
  )
}

export default LoginForm
