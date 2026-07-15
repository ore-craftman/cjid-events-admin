import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
import { Layout } from '../components/layout/Layout'
import { BlogPostForm } from '../components/blog/BlogPostForm'
import { FeedbackMessage } from '../components/ui/FeedbackMessage'
import { blogPosts } from '../data/mockData'

export function EditBlogPostPage() {
  const { id } = useParams()
  const post = blogPosts.find((p) => p.id === id) ?? blogPosts[0]
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null,
  )

  const handleSave = async () => {
    setFeedback(null)
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setFeedback({
        type: 'success',
        message: 'Blog post updated successfully!',
      })
    } catch {
      setFeedback({
        type: 'error',
        message: 'Failed to save changes. Please try again.',
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
        <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">Edit Post</h1>
        <p className="mt-1 text-sm text-zinc-500">{post.title}</p>

        {feedback && (
          <div className="mt-6">
            <FeedbackMessage
              type={feedback.type}
              message={feedback.message}
              onDismiss={() => setFeedback(null)}
            />
          </div>
        )}

        <div className="mt-6 space-y-6 sm:mt-8">
          <BlogPostForm defaults={post} />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isSubmitting ? 'Saving…' : 'Save Changes'}
          </button>
          <Link
            to="/?tab=blog"
            className="rounded-md border border-zinc-300 bg-white px-6 py-2.5 text-center text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 sm:text-left"
          >
            Cancel
          </Link>
        </div>
      </div>
    </Layout>
  )
}
