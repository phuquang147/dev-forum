export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  email: string
  password: string
}

export interface SignUpRequest {
  email: string
  password: string
  confirmPassword: string
  displayName: string
}

export interface SignUpResponse {
  email: string
  password: string
  confirmPassword: string
  displayName: string
}
