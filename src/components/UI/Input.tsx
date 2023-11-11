import {
  Input as MTInput,
  Typography,
  type InputProps as MTInputProps,
} from '@material-tailwind/react'
import type {
  color,
  size,
} from '@material-tailwind/react/types/components/input'
import { type FC, type ChangeEvent } from 'react'
import {
  type FieldError,
  type FieldValue,
  type UseFormRegister,
} from 'react-hook-form'

interface InputProps extends MTInputProps {
  name?: string
  register?: UseFormRegister<FieldValue<any>>
  fieldError?: FieldError
  color?: color // Assuming 'color' and 'size' are defined elsewhere as specific types
  size?: size
}

type InputPropsWithRegister = {
  name: string
  register: UseFormRegister<FieldValue<any>>
  fieldError: FieldError | undefined
} & Partial<Pick<InputProps, 'register'>>

type InputPropsWithValue = {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
} & Partial<Pick<InputProps, 'value' | 'onChange'>>

type MergedInputProps = InputProps &
  (InputPropsWithRegister | InputPropsWithValue)

const Input: FC<MergedInputProps> = ({
  name = '',
  register,
  fieldError,
  color = 'cyan',
  size = 'lg',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      <MTInput
        crossOrigin=""
        color={color}
        size={size}
        {...props}
        {...register?.(name)}
      />
      {fieldError && (
        <Typography className="text-xs" color="red">
          {fieldError.message}
        </Typography>
      )}
    </div>
  )
}

export default Input
