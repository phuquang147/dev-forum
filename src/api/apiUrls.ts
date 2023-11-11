export const DOMAIN_NAME = process.env.NEXT_PUBLIC_BASE_URL
export const DOMAIN_NAME_FILE_SERVICE =
  process.env.NEXT_PUBLIC_BASE_URL_FILE_SERVICE

// Auth
export const URL_LOGIN = `${DOMAIN_NAME}/auth/login`
export const URL_SIGN_UP = `${DOMAIN_NAME}/auth/signup`
export const URL_GET_ME = `${DOMAIN_NAME}/auth/profile`

// Images
export const URL_POST_IMAGE = `${DOMAIN_NAME}/upload-image`
