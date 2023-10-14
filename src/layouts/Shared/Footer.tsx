import { Typography } from '@material-tailwind/react'
import { type FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className="w-full border-t border-black border-opacity-10  bg-white px-10">
      <Typography color="blue-gray" className="py-2 text-center font-normal">
        &copy; 2023 Dev Forum
      </Typography>
    </footer>
  )
}

export default Footer
