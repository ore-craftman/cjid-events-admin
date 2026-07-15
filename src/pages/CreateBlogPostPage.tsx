import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, Loader2 } from 'lucide-react'
import { Layout } from '../components/layout/Layout'
import { BlogPostForm } from '../components/blog/BlogPostForm'
import { FeedbackMessage } from '../components/ui/FeedbackMessage'

export function CreateBlogPostPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null,
  )

  const handleCreate = async () => {
    setFeedback(null)
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setFeedback({
        type: 'success',
        message: 'Blog post created successfully! Redirecting to dashboard…',
      })
      setTimeout(() => navigate('/?tab=blog'), 2000)
    } catch {
      setFeedback({
        type: 'error',
        message: 'Failed to create blog post. Please check required fields and try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <Link
          to="/?tab=blog"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog Posts
        </Link>
        <h1 className="mb-6 text-2xl font-bold text-zinc-900 sm:mb-8 sm:text-3xl">Create New Post</h1>

        {feedback && (
          <div className="mb-6">
            <FeedbackMessage
              type={feedback.type}
              message={feedback.message}
              onDismiss={() => setFeedback(null)}
            />
          </div>
        )}

        <div className="space-y-6">
          <BlogPostForm />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
          <button
            type="button"
            onClick={handleCreate}
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
            {isSubmitting ? 'Creating Post…' : 'Create Post'}
          </button>
          <Link
            to="/?tab=blog"
            className="text-center text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 sm:text-left"
          >
            Cancel
          </Link>
        </div>
      </div>
    </Layout>
  )
}
