import { Typography } from '@material-tailwind/react'
import Image from 'next/image'
import { type FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className="w-full border-t border-black border-opacity-10  bg-white px-10">
      <div className="flex flex-row flex-wrap items-center justify-center gap-x-12 gap-y-6 bg-white py-4 text-center md:justify-between">
        <div className="flex items-center gap-4">
          <Image src="/images/logo.png" alt="logo" width={40} height={40} />
          <Typography variant="h6" color="cyan">
            Dev Forum
          </Typography>
        </div>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              License
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contribute
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="border-blue-gray-50" />
      <Typography color="blue-gray" className="py-2 text-center font-normal">
        &copy; 2023 Dev Forum
      </Typography>
    </footer>
  )
}

export default Footer
