import { CheckCircle2, XCircle, X } from 'lucide-react'

interface FeedbackMessageProps {
  type: 'success' | 'error'
  message: string
  onDismiss?: () => void
}

export function FeedbackMessage({ type, message, onDismiss }: FeedbackMessageProps) {
  const isSuccess = type === 'success'

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${
        isSuccess
          ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
          : 'border-red-200 bg-red-50 text-red-800'
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
      ) : (
        <XCircle className="mt-0.5 h-5 w-5 shrink-0" />
      )}
      <p className="flex-1 text-sm font-medium">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 opacity-70 hover:opacity-100"
          aria-label="Dismiss message"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
