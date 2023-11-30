export const DOMAIN_NAME = process.env.NEXT_PUBLIC_BASE_URL
export const DOMAIN_NAME_FILE_SERVICE =
  process.env.NEXT_PUBLIC_BASE_URL_FILE_SERVICE

// Auth
export const URL_LOGIN = `${DOMAIN_NAME}/auth/login`
export const URL_SIGN_UP = `${DOMAIN_NAME}/auth/signup`
export const URL_GET_ME = `${DOMAIN_NAME}/auth/profile`
export const URL_UPDATE_PASSWORD = `${DOMAIN_NAME}/auth/change-password`
export const URL_UPDATE_PROFILE = `${DOMAIN_NAME}/auth/update-profile`

// Images
export const URL_UPLOAD_IMAGE = `${DOMAIN_NAME}/upload-image`

// Tags
export const URL_GET_TAGS = `${DOMAIN_NAME}/tags`
export const URL_CREATE_TAG = `${DOMAIN_NAME}/tags`
export const URL_UPDATE_TAG = (id: string): string =>
  `${DOMAIN_NAME}/tags/${id}`
export const URL_DELETE_TAG = (id: string): string =>
  `${DOMAIN_NAME}/tags/${id}`

// Posts
export const URL_GET_POSTS = (query: string): string =>
  `${DOMAIN_NAME}/posts/${query}`
export const URL_GET_POST_BY_SLUG = (slug: string): string =>
  `${DOMAIN_NAME}/posts/${slug}`
export const URL_CREATE_POST = `${DOMAIN_NAME}/posts`
export const URL_UPDATE_POST = (id: string): string =>
  `${DOMAIN_NAME}/posts/${id}`
export const URL_DELETE_POST = (id: string): string =>
  `${DOMAIN_NAME}/posts/${id}`
