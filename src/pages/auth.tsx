import {
  Card,
  CardBody,
  CardHeader,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from '@material-tailwind/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { type FC } from 'react'
import LoginForm from '~/components/Auth/LoginForm'
import RegisterForm from '~/components/Auth/RegisterForm'

const Login: FC = () => {
  const [type, setType] = React.useState<'login' | 'register'>('login')

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="h-screen min-h-fit">
        <div className="flex h-full max-h-screen w-full justify-center overflow-auto py-10">
          <Card className="h-fit w-full max-w-[500px] border border-none border-black border-opacity-10 shadow-none md:shadow-lg">
            <CardHeader
              color="white"
              floated={false}
              shadow={false}
              className="m-0 grid h-fit place-items-center rounded-b-none px-4 py-10 text-center"
            >
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={56}
                  height={56}
                />
              </Link>
              <Link href="/">
                <Typography variant="h4" color="cyan" className="mt-4">
                  Dev Forum
                </Typography>
              </Link>
            </CardHeader>
            <CardBody>
              <Tabs value={type} className="overflow-visible">
                <TabsHeader className="relative z-0">
                  <Tab
                    value="login"
                    onClick={() => {
                      setType('login')
                    }}
                  >
                    <Typography variant="h6" className="text-gray-700">
                      Sign In
                    </Typography>
                  </Tab>
                  <Tab
                    value="register"
                    onClick={() => {
                      setType('register')
                    }}
                  >
                    <Typography variant="h6" className="text-gray-700">
                      Sign Up
                    </Typography>
                  </Tab>
                </TabsHeader>
                <TabsBody
                  animate={{
                    initial: {
                      x: type === 'login' ? 400 : -400,
                    },
                    mount: {
                      x: 0,
                    },
                    unmount: {
                      x: type === 'login' ? 400 : -400,
                    },
                  }}
                >
                  <TabPanel value="login" className="p-0">
                    <LoginForm />
                  </TabPanel>
                  <TabPanel value="register" className="p-0">
                    <RegisterForm />
                  </TabPanel>
                </TabsBody>
              </Tabs>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Login
