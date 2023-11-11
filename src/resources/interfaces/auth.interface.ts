export interface LoginFormData {
  email: string
  password: string
}

export interface LoggedInUser {
  id: string
  name: string
}

export interface SignUpFormData {
  email: string
  password: string
  displayName: string
  confirmPassword: string
}
