import axios, { type AxiosResponse } from 'axios'
import type { ITag, ITagFormData } from '~/resources/interfaces/tag.interface'
import {
  URL_CREATE_TAG,
  URL_DELETE_TAG,
  URL_GET_TAGS,
  URL_UPDATE_TAG,
} from './apiUrls'

export const getTagsFn = ({
  jwt,
}: {
  jwt: string
}): Promise<AxiosResponse<ITag[]>> => {
  return axios({
    url: URL_GET_TAGS,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
}

export const createTagFn = ({
  jwt,
  data,
}: {
  jwt: string
  data: ITagFormData
}): Promise<AxiosResponse<ITag[]>> => {
  return axios({
    url: URL_CREATE_TAG,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    data,
  })
}

export const updateTagFn = ({
  jwt,
  id,
  data,
}: {
  jwt: string
  id: string
  data: ITagFormData
}): Promise<AxiosResponse> => {
  return axios({
    url: URL_UPDATE_TAG(id),
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    data,
  })
}

export const deleteTagFn = ({
  jwt,
  id,
}: {
  jwt: string
  id: string
}): Promise<AxiosResponse> => {
  return axios({
    url: URL_DELETE_TAG(id),
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
}
