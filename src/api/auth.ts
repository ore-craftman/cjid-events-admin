import { apiGet, apiPost } from './client'
import type { AdminUser } from '../lib/auth-storage'

interface AuthResponse {
  accessToken: string
  user: AdminUser
}

export interface SignupPayload {
  email: string
  password: string
  name?: string
}

export interface LoginPayload {
  email: string
  password: string
}

export async function signup(payload: SignupPayload): Promise<AuthResponse> {
  return apiPost<AuthResponse>('/auth/signup/', payload, { auth: false })
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  return apiPost<AuthResponse>('/auth/login/', payload, { auth: false })
}

export async function getMe(): Promise<AdminUser> {
  return apiGet<AdminUser>('/auth/me/')
}
