import { apiGet, apiPost, ApiError } from './client'

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] as const

export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024

interface SignedUploadResponse {
  uploadUrl: string
  blobName: string
  method: string
  contentType: string
  expiresAt: string
}

interface UploadConfirmResponse {
  url: string
  blobName: string
  contentType: string
  size: number | null
}

function getSignedUploadUrl(contentType: string) {
  return apiGet<SignedUploadResponse>('/uploads/signed-url/', { contentType })
}

function confirmUpload(blobName: string) {
  return apiPost<UploadConfirmResponse>('/uploads/confirm/', { blobName })
}

export async function uploadImage(
  file: File,
  onProgress?: (stage: 'requesting' | 'uploading' | 'confirming') => void,
): Promise<string> {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
    throw new Error('Please choose a JPG, PNG, WebP, or GIF image.')
  }
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error('Image is too large. Maximum size is 10MB.')
  }

  onProgress?.('requesting')
  const signed = await getSignedUploadUrl(file.type)

  onProgress?.('uploading')
  const uploadResponse = await fetch(signed.uploadUrl, {
    method: signed.method,
    headers: { 'Content-Type': signed.contentType },
    body: file,
  })
  if (!uploadResponse.ok) {
    throw new ApiError('Failed to upload image to storage.', uploadResponse.status)
  }

  onProgress?.('confirming')
  const confirmed = await confirmUpload(signed.blobName)
  return confirmed.url
}
