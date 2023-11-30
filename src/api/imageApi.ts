import Axios, { type AxiosResponse } from 'axios'
import { URL_UPLOAD_IMAGE } from './apiUrls'

export const uploadImageFn = ({
  jwt,
  data,
}: {
  jwt: string
  data: FormData
}): Promise<AxiosResponse> => {
  return Axios({
    method: 'POST',
    url: URL_UPLOAD_IMAGE,
    data,
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'multipart/form-data',
    },
  })
}
