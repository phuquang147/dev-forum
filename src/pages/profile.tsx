import { PencilIcon } from '@heroicons/react/24/outline'
import { Avatar, IconButton } from '@material-tailwind/react'
import PasswordForm from '~/components/Profile/PasswordForm'
import ProfileForm from '~/components/Profile/ProfileForm'
import UserLayout from '~/layouts/UserLayout'
import { type NextPageWithLayout } from './_app'

const Profile: NextPageWithLayout = () => {
  return (
    <div className="container flex flex-col gap-6">
      <div className="relative h-fit w-fit">
        <Avatar
          variant="circular"
          alt="avatar"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          className="h-36 w-36"
        />
        <IconButton
          variant="gradient"
          color="cyan"
          className="!absolute bottom-0 right-0 rounded-full"
        >
          <PencilIcon className="h-4 w-4" />
        </IconButton>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ProfileForm />
        <PasswordForm />
      </div>
    </div>
  )
}

export default Profile

Profile.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
