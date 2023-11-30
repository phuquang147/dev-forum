import { TagIcon } from '@heroicons/react/24/outline'
import { Card, List } from '@material-tailwind/react'
import { type FC } from 'react'
import NavItem from '../Shared/NavItem'

const navConfig = [
  {
    title: 'Tags',
    link: '/admin/tags',
    icon: <TagIcon className="h-5 w-5" />,
  },
]

const AdminSidebar: FC = () => {
  return (
    <Card className="relative h-full w-full rounded-none border-r border-black border-opacity-10 p-4 shadow-none">
      <List className="sticky top-[90px]">
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

export default AdminSidebar
