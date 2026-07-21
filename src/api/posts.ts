import { apiDelete, apiGet, apiPatch, apiPost } from './client'
import type { BlogPost } from '../types'

export interface BlogPostWritePayload {
  title: string
  category: string
  status?: string
  readTime?: string
  content?: string
}

export function listPosts(status?: string) {
  return apiGet<BlogPost[]>('/posts/', status ? { status } : undefined)
}

export function getPost(id: string) {
  return apiGet<BlogPost>(`/posts/${id}/`)
}

export function createPost(payload: BlogPostWritePayload) {
  return apiPost<BlogPost>('/posts/', payload)
}

export function updatePost(id: string, payload: Partial<BlogPostWritePayload>) {
  return apiPatch<BlogPost>(`/posts/${id}/`, payload)
}

export function deletePost(id: string) {
  return apiDelete(`/posts/${id}/`)
}
