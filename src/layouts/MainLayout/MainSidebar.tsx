import {
  BugAntIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'
import { InboxIcon } from '@heroicons/react/24/solid'
import { Card, List } from '@material-tailwind/react'
import { type FC } from 'react'
import NavItem from '../Shared/NavItem'

const navConfig = [
  {
    title: 'All topics',
    link: '/',
    icon: <InboxIcon className="h-5 w-5" />,
  },
  {
    title: 'Discuss',
    link: '/discuss',
    icon: <ChatBubbleLeftRightIcon className="h-5 w-5" />,
  },
  {
    title: 'Bug',
    link: '/bug',
    icon: <BugAntIcon className="h-5 w-5" />,
  },
  {
    title: 'Tech news',
    link: '/news',
    icon: <InboxIcon className="h-5 w-5" />,
  },
]

const MainSidebar: FC = () => {
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

export default MainSidebar
