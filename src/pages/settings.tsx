import UserLayout from '~/layouts/UserLayout'
import { type NextPageWithLayout } from './_app'

const Settings: NextPageWithLayout = () => {
  return <div className="container">a</div>
}

export default Settings

Settings.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
