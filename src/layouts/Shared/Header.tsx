import { PlusIcon } from '@heroicons/react/24/outline'
import {
  Button,
  Collapse,
  IconButton,
  Navbar,
  Typography,
} from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { type FC } from 'react'
import Notifications from './Notifications'
import ProfileMenu from './ProfileMenu'
import Search from './Search'

const Header: FC = () => {
  const session = useSession()
  const router = useRouter()
  const [openNav, setOpenNav] = React.useState(false)

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      window.innerWidth >= 960 && setOpenNav(false)
    })
  }, [])

  return (
    <Navbar className="sticky top-0 z-50 h-max max-w-full rounded-none shadow">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link href="/" className="flex items-center gap-4">
          <Image src="/images/logo.png" alt="logo" width={40} height={40} />
          <Typography variant="h6" color="cyan">
            Dev Forum
          </Typography>
        </Link>
        <div className="flex items-center gap-4">
          <Search />
          {session.status === 'authenticated' && (
            <>
              <Link href="/posts/create">
                <Button
                  className="flex items-center gap-2"
                  size="md"
                  color="cyan"
                  variant="gradient"
                >
                  <PlusIcon className="h-4 w-4" />
                  Create post
                </Button>
              </Link>
              <Notifications />
              <ProfileMenu />
            </>
          )}
          {session.data?.user.user.role === 'Admin' && (
            <Button
              variant="gradient"
              size="md"
              className="hidden lg:inline-block"
              color="cyan"
              onClick={() => {
                router.push('/admin/tags')
              }}
            >
              Admin
            </Button>
          )}
          {session.status === 'unauthenticated' && (
            <Button
              variant="gradient"
              size="md"
              className="hidden lg:inline-block"
              color="cyan"
              onClick={() => {
                router.push('/auth')
              }}
            >
              Sign In
            </Button>
          )}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => {
              setOpenNav(!openNav)
            }}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav} className="flex flex-col p-0">
        <Button
          variant="gradient"
          color="cyan"
          size="sm"
          fullWidth
          className="flex-1"
          onClick={() => {
            router.push('/auth')
          }}
        >
          Sign In
        </Button>
      </Collapse>
    </Navbar>
  )
}

export default Header
