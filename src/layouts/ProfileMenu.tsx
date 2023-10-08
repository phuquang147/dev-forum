import {
  Cog6ToothIcon,
  PowerIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react'
import { type FC } from 'react'

const ProfileMenu: FC = () => {
  return (
    <Menu>
      <MenuHandler>
        <Avatar
          variant="rounded"
          alt="avatar"
          size="sm"
          className="h-10 w-10 cursor-pointer"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        />
      </MenuHandler>
      <MenuList>
        <MenuItem className="flex items-center gap-2">
          <UserCircleIcon className="h-5 w-5" />
          <Typography variant="small" className="font-normal">
            Profile
          </Typography>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
          <Cog6ToothIcon className="h-5 w-5" />
          <Typography variant="small" className="font-normal">
            Settings
          </Typography>
        </MenuItem>
        <hr className="my-2 border-blue-gray-50" />
        <MenuItem className="flex items-center gap-2 ">
          <PowerIcon className="h-5 w-5 text-red-500" />
          <Typography color="red" variant="small" className="font-normal">
            Sign out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default ProfileMenu
