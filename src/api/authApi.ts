import axios from 'axios'
import type {
  LoginFormData,
  SignUpFormData,
} from '~/resources/interfaces/auth.interface'
import { URL_LOGIN, URL_SIGN_UP } from './apiUrls'

export const loginFn = (loginFormData: LoginFormData): Promise<any> => {
  return axios({
    url: URL_LOGIN,
    method: 'POST',
    data: loginFormData,
  })
}

export const signUpFn = (signUpFormData: SignUpFormData): Promise<any> => {
  return axios({
    url: URL_SIGN_UP,
    method: 'POST',
    data: signUpFormData,
  })
}
