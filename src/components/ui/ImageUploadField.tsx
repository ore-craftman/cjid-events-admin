import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { ImageIcon, Loader2, Upload, X } from 'lucide-react'
import { uploadImage } from '../../api/uploads'

export interface ImageUploadFieldHandle {
  getImageUrl: () => string
}

interface ImageUploadFieldProps {
  label: string
  defaultImageUrl?: string
}

type UploadStage = 'idle' | 'requesting' | 'uploading' | 'confirming' | 'error'

const stageLabels: Record<UploadStage, string> = {
  idle: '',
  requesting: 'Preparing upload...',
  uploading: 'Uploading...',
  confirming: 'Finalizing...',
  error: '',
}

export const ImageUploadField = forwardRef<ImageUploadFieldHandle, ImageUploadFieldProps>(
  function ImageUploadField({ label, defaultImageUrl }, ref) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImageUrl ?? null)
    const [imageUrl, setImageUrl] = useState(defaultImageUrl ?? '')
    const [stage, setStage] = useState<UploadStage>('idle')
    const [error, setError] = useState<string | null>(null)

    useImperativeHandle(ref, () => ({
      getImageUrl: () => imageUrl,
    }))

    useEffect(() => {
      return () => {
        if (previewUrl && previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(previewUrl)
        }
      }
    }, [previewUrl])

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      event.target.value = ''
      if (!file) return

      setError(null)
      const localPreview = URL.createObjectURL(file)
      setPreviewUrl((current) => {
        if (current?.startsWith('blob:')) {
          URL.revokeObjectURL(current)
        }
        return localPreview
      })

      try {
        const url = await uploadImage(file, setStage)
        setImageUrl(url)
        setStage('idle')
      } catch (err) {
        setStage('error')
        setError(err instanceof Error ? err.message : 'Failed to upload image.')
      }
    }

    const clearImage = () => {
      setPreviewUrl((current) => {
        if (current?.startsWith('blob:')) {
          URL.revokeObjectURL(current)
        }
        return null
      })
      setImageUrl('')
      setError(null)
      setStage('idle')
    }

    const isUploading = stage === 'requesting' || stage === 'uploading' || stage === 'confirming'

    return (
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">{label}</label>

        <div className="relative flex min-h-[140px] items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-zinc-200 bg-zinc-50 transition-colors duration-300">
          {previewUrl ? (
            <>
              <img
                src={previewUrl}
                alt="Preview"
                className={`animate-fade-in max-h-48 w-full rounded-md object-contain p-2 transition-opacity duration-300 ${
                  isUploading ? 'opacity-40' : 'opacity-100'
                }`}
              />
              {!isUploading && (
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-zinc-500 shadow-sm transition-all duration-200 hover:scale-110 hover:bg-white hover:text-red-500"
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 py-8 text-zinc-400">
              <ImageIcon className="h-8 w-8" />
              <span className="text-sm">No image selected</span>
            </div>
          )}

          {isUploading && (
            <div className="animate-fade-in absolute inset-0 flex items-center justify-center gap-2 bg-white/70 text-sm font-medium text-zinc-700 backdrop-blur-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              {stageLabels[stage]}
            </div>
          )}
        </div>

        {error && <p className="animate-slide-up mt-2 text-xs font-medium text-red-600">{error}</p>}

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-zinc-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {previewUrl ? 'Change Image' : 'Choose Image'}
          </button>
          <span className="text-xs text-zinc-500">JPG, PNG, WebP, or GIF, up to 10MB</span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    )
  },
)
