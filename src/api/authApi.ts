import axios, { type AxiosResponse } from 'axios'
import type {
  IPasswordFormData,
  LoginFormData,
  SignUpFormData,
} from '~/resources/interfaces/auth.interface'
import type {
  IProfileFormData,
  IUserProfile,
} from '~/resources/interfaces/user.interface'
import {
  URL_GET_ME,
  URL_LOGIN,
  URL_SIGN_UP,
  URL_UPDATE_PASSWORD,
  URL_UPDATE_PROFILE,
} from './apiUrls'

export const loginFn = (
  loginFormData: LoginFormData
): Promise<AxiosResponse> => {
  return axios({
    url: URL_LOGIN,
    method: 'POST',
    data: loginFormData,
  })
}

export const signUpFn = (
  signUpFormData: SignUpFormData
): Promise<AxiosResponse> => {
  return axios({
    url: URL_SIGN_UP,
    method: 'POST',
    data: signUpFormData,
  })
}

export const getProfileFn = ({
  jwt,
}: {
  jwt: string
}): Promise<AxiosResponse<IUserProfile>> => {
  return axios({
    url: URL_GET_ME,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
}

export const updatePasswordFn = ({
  jwt,
  data,
}: {
  jwt: string
  data: IPasswordFormData
}): Promise<AxiosResponse> => {
  return axios({
    url: URL_UPDATE_PASSWORD,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    data,
  })
}

export const updateProfileFn = ({
  jwt,
  data,
}: {
  jwt: string
  data: IProfileFormData
}): Promise<AxiosResponse> => {
  return axios({
    url: URL_UPDATE_PROFILE,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    data,
  })
}
