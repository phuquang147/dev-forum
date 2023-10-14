import {
  BellIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { Card, List } from '@material-tailwind/react'
import { type FC } from 'react'
import NavItem from '../Shared/NavItem'

const navConfig = [
  {
    title: 'Profile',
    link: '/profile',
    icon: <UserCircleIcon className="h-5 w-5" />,
  },
  {
    title: 'Settings',
    link: '/settings',
    icon: <Cog6ToothIcon className="h-5 w-5" />,
  },
  {
    title: 'Notifications',
    link: '/notifications',
    icon: <BellIcon className="h-5 w-5" />,
  },
  {
    title: 'Messages',
    link: '/messages',
    icon: <ChatBubbleLeftRightIcon className="h-5 w-5" />,
  },
  {
    title: 'Schedule',
    link: '/schedule',
    icon: <CalendarIcon className="h-5 w-5" />,
  },
]

const UserSidebar: FC = () => {
  return (
    <Card className="sticky h-full w-full rounded-none border-r border-black border-opacity-10 p-4 shadow-none">
      <List>
        {navConfig.map((navItem) => (
          <NavItem
            key={navItem.link}
            title={navItem.title}
            link={navItem.link}
            icon={navItem.icon}
          />
        ))}
      </List>
    </Card>
  )
}

export default UserSidebar
