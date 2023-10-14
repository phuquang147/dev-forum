import { ListItem, ListItemPrefix } from '@material-tailwind/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { type FC, type ReactNode } from 'react'

interface NavItemProps {
  title: string
  link: string
  icon: ReactNode
}

const NavItem: FC<NavItemProps> = ({ title, link, icon }) => {
  const router = useRouter()

  return (
    <Link href={link}>
      <ListItem
        className={`${
          router.pathname === link &&
          'bg-cyan-50 text-cyan-500 hover:bg-cyan-50 hover:text-cyan-500 focus:bg-cyan-50 focus:text-cyan-500 active:bg-cyan-50 active:text-cyan-500'
        }`}
      >
        <ListItemPrefix>{icon}</ListItemPrefix>
        {title}
      </ListItem>
    </Link>
  )
}

export default NavItem
