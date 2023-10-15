import { Button, Card, Input, Typography } from '@material-tailwind/react'
import { type FC } from 'react'

const ProfileForm: FC = () => {
  return (
    <Card className="flex h-fit flex-col gap-4 p-6 shadow">
      <Typography className="font-semibold">Profile</Typography>
      <form className="flex flex-col gap-4">
        <Input crossOrigin="" label="Full name" color="cyan" size="lg" />
        <Input crossOrigin="" label="Email" color="cyan" size="lg" />
        <Button variant="gradient" color="cyan" className="self-end">
          Save
        </Button>
      </form>
    </Card>
  )
}

export default ProfileForm
