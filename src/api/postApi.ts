import axios, { type AxiosResponse } from 'axios'
import type {
  IPost,
  IPostDetail,
  IPostFormData,
} from '~/resources/interfaces/post.interface'
import {
  URL_CREATE_POST,
  URL_DELETE_POST,
  URL_GET_POSTS,
  URL_GET_POST_BY_SLUG,
  URL_UPDATE_POST,
} from './apiUrls'

export const getPostsFn = ({
  jwt,
  query,
}: {
  jwt: string
  query: string
}): Promise<AxiosResponse<IPost[]>> => {
  return axios({
    url: URL_GET_POSTS(query),
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
}

export const getPostBySlugFn = ({
  slug,
}: {
  slug: string
}): Promise<AxiosResponse<IPostDetail>> => {
  return axios({
    url: URL_GET_POST_BY_SLUG(slug),
    method: 'GET',
  })
}

export const createPostFn = ({
  jwt,
  data,
}: {
  jwt: string
  data: IPostFormData
}): Promise<AxiosResponse<IPost[]>> => {
  return axios({
    url: URL_CREATE_POST,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    data,
  })
}

export const updatePostFn = ({
  jwt,
  id,
  data,
}: {
  jwt: string
  id: string
  data: IPostFormData
}): Promise<AxiosResponse> => {
  return axios({
    url: URL_UPDATE_POST(id),
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    data,
  })
}

export const deletePostFn = ({
  jwt,
  id,
}: {
  jwt: string
  id: string
}): Promise<AxiosResponse> => {
  return axios({
    url: URL_DELETE_POST(id),
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
}
