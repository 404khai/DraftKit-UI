import type { OutputData } from '@editorjs/editorjs'
import { apiClient } from './http'

export interface PostPayload {
  title: string
  slug: string
  blocks: OutputData | null
}

export interface PostResponse {
  id: string
  title: string
  slug: string
  published: boolean
  blocks: OutputData | null
}

export const createPost = async (
  payload: PostPayload
): Promise<PostResponse> => {
  const { data } = await apiClient.post<PostResponse>('/posts', payload)
  return data
}

export const updatePost = async (
  id: string,
  payload: PostPayload
): Promise<PostResponse> => {
  const { data } = await apiClient.put<PostResponse>(`/posts/${id}`, payload)
  return data
}

export const getPost = async (id: string): Promise<PostResponse> => {
  const { data } = await apiClient.get<PostResponse>(`/posts/${id}`)
  return data
}

export const publishPost = async (id: string): Promise<void> => {
  await apiClient.post(`/posts/${id}/publish`)
}

export const listPosts = async (): Promise<PostResponse[]> => {
  const { data } = await apiClient.get<PostResponse[]>('/posts')
  return data
}

