export interface IUserProfile {
  avatar: string
  displayName: string
  email: string
  description: string
}

export interface IProfileFormData {
  displayName: string
  description?: string
  favorites?: string[]
}
