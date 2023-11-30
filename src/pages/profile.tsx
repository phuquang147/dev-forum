import { PencilIcon } from '@heroicons/react/24/outline'
import { Avatar, IconButton } from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useQuery } from 'react-query'
import { getProfileFn } from '~/api/authApi'
import PasswordForm from '~/components/Profile/PasswordForm'
import ProfileForm from '~/components/Profile/ProfileForm'
import PageHeading from '~/components/Shared/PageHeading'
import Loading from '~/components/UI/Loading'
import UserLayout from '~/layouts/UserLayout'
import { showToast } from '~/utils/toast'
import { type NextPageWithLayout } from './_app'

const Profile: NextPageWithLayout = () => {
  const session = useSession()

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () =>
      await getProfileFn({ jwt: session.data?.user?.access_token ?? '' }),
    onError: (error: any) => {
      showToast('error', error.response.data.message)
    },
  })

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className="container flex flex-col gap-6">
        <PageHeading content="Profile" />
        <div className="relative h-fit w-fit">
          <Avatar
            variant="circular"
            alt="avatar"
            src={profileData?.data.avatar ?? '/images/user.png'}
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
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <ProfileForm profile={profileData?.data} />
              <PasswordForm />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Profile

Profile.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
