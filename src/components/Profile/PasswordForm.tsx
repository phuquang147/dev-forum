import { Button, Card, Input, Typography } from '@material-tailwind/react'
import { type FC } from 'react'

const PasswordForm: FC = () => {
  return (
    <Card className="flex flex-col gap-4 p-6 shadow">
      <Typography className="font-semibold">Profile</Typography>
      <form className="flex flex-col gap-4">
        <Input crossOrigin="" label="Old password" color="cyan" size="lg" />
        <Input crossOrigin="" label="New password" color="cyan" size="lg" />
        <Input
          crossOrigin=""
          label="Confirm new password"
          color="cyan"
          size="lg"
        />
        <Button variant="gradient" color="cyan" className="self-end">
          Save
        </Button>
      </form>
    </Card>
  )
}

export default PasswordForm
