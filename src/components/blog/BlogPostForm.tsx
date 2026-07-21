import { forwardRef, useImperativeHandle, useRef } from 'react'
import { FormField, inputClassName, selectClassName, textareaClassName } from '../ui/FormField'
import { FormSection } from '../ui/FormSection'
import type { BlogPost } from '../../types'

export interface BlogPostFormValues {
  title: string
  category: string
  status: string
  readTime: string
  content: string
}

export interface BlogPostFormHandle {
  getValues: () => BlogPostFormValues
}

interface BlogPostFormProps {
  defaults?: Partial<BlogPost>
}

export const BlogPostForm = forwardRef<BlogPostFormHandle, BlogPostFormProps>(function BlogPostForm(
  { defaults = {} },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    getValues: () => {
      const root = containerRef.current
      const value = (name: string) =>
        (root?.querySelector(`[name="${name}"]`) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)
          ?.value ?? ''

      return {
        title: value('title'),
        category: value('category'),
        status: value('status'),
        readTime: value('readTime'),
        content: value('content'),
      }
    },
  }))

  return (
    <FormSection title="Post Details">
      <div ref={containerRef} className="space-y-4">
        <FormField label="Post Title" required>
          <input
            type="text"
            name="title"
            className={inputClassName}
            placeholder="Enter post title"
            defaultValue={defaults.title}
            required
          />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Category" required>
            <select name="category" className={selectClassName} defaultValue={defaults.category || ''} required>
              <option value="" disabled>
                Select category
              </option>
              <option value="Event Recap">Event Recap</option>
              <option value="Insight">Insight</option>
              <option value="Story">Story</option>
            </select>
          </FormField>
          <FormField label="Status" required>
            <select
              name="status"
              className={selectClassName}
              defaultValue={defaults.status?.toLowerCase() || 'draft'}
              required
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </FormField>
        </div>

        <FormField label="Read Time">
          <input
            type="text"
            name="readTime"
            className={inputClassName}
            placeholder="e.g. 5 min read"
            defaultValue={defaults.readTime}
          />
        </FormField>

        <FormField label="Content" required>
          <textarea
            name="content"
            className={textareaClassName}
            placeholder="Write your blog post content..."
            rows={10}
            defaultValue={defaults.content}
            required
          />
        </FormField>
      </div>
    </FormSection>
  )
})
