import Notification from '~/components/Notifications/Notification'
import PageHeading from '~/components/Shared/PageHeading'
import UserLayout from '~/layouts/UserLayout'
import { type NextPageWithLayout } from './_app'

const Notifications: NextPageWithLayout = () => {
  return (
    <div className="container flex flex-col gap-4">
      <PageHeading content="Notifications" />
      <div className="mx-auto flex w-full max-w-[600px] flex-col">
        <Notification />
        <Notification />
        <Notification />
      </div>
    </div>
  )
}

export default Notifications

Notifications.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
