import { Typography } from '@material-tailwind/react'
import { type FC, type ReactNode } from 'react'

interface ErrorWrapperProps {
  children: ReactNode
  fieldError: string | undefined
}

const ErrorWrapper: FC<ErrorWrapperProps> = ({ children, fieldError }) => {
  return (
    <div>
      {children}
      {fieldError && (
        <Typography className="text-xs" color="red">
          {fieldError}
        </Typography>
      )}
    </div>
  )
}

export default ErrorWrapper
