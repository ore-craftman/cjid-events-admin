import { useEffect, useRef, useState } from 'react'
import { ImageIcon, Upload } from 'lucide-react'

interface EventThumbnailFieldProps {
  defaultThumbnailUrl?: string
}

export function EventThumbnailField({ defaultThumbnailUrl }: EventThumbnailFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultThumbnailUrl ?? null)

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setPreviewUrl((current) => {
      if (current?.startsWith('blob:')) {
        URL.revokeObjectURL(current)
      }
      return URL.createObjectURL(file)
    })
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-zinc-700">
        Event Thumbnail (landscape or portrait)
      </label>

      <div className="flex min-h-[140px] items-center justify-center rounded-lg border-2 border-dashed border-zinc-200 bg-zinc-50">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Event thumbnail preview"
            className="max-h-48 w-full rounded-md object-contain p-2"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 py-8 text-zinc-400">
            <ImageIcon className="h-8 w-8" />
            <span className="text-sm">No thumbnail selected</span>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          <Upload className="h-4 w-4" />
          Choose Image
        </button>
        <span className="text-xs text-zinc-500">JPG, PNG, WebP — any aspect ratio</span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
