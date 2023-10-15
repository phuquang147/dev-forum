import UserLayout from '~/layouts/UserLayout'
import { type NextPageWithLayout } from './_app'

const Notifications: NextPageWithLayout = () => {
  return <div className="container">a</div>
}

export default Notifications

Notifications.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
