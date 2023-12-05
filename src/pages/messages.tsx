import Head from 'next/head'
import ChatWindow from '~/components/Messages/ChatWindow'
import RoomList from '~/components/Messages/RoomList'
import PageHeading from '~/components/Shared/PageHeading'
import UserLayout from '~/layouts/UserLayout'
import { type NextPageWithLayout } from './_app'

const Messages: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Messages</title>
      </Head>
      <div className="container flex h-full flex-col">
        <PageHeading content="Messages" />
        <div className="grid w-full flex-1 grid-cols-12 pt-4">
          <RoomList />
          <ChatWindow />
        </div>
      </div>
    </>
  )
}

export default Messages

Messages.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
