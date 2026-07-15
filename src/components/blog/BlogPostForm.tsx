import { FormField, inputClassName, selectClassName, textareaClassName } from '../ui/FormField'
import { FormSection } from '../ui/FormSection'
import type { BlogPost } from '../../types'

interface BlogPostFormProps {
  defaults?: Partial<BlogPost>
}

export function BlogPostForm({ defaults = {} }: BlogPostFormProps) {
  return (
    <FormSection title="Post Details">
      <div className="space-y-4">
        <FormField label="Post Title" required>
          <input
            type="text"
            className={inputClassName}
            placeholder="Enter post title"
            defaultValue={defaults.title}
            required
          />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Category" required>
            <select className={selectClassName} defaultValue={defaults.category || ''} required>
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
            className={inputClassName}
            placeholder="e.g. 5 min read"
            defaultValue={defaults.readTime}
          />
        </FormField>

        <FormField label="Content" required>
          <textarea
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
}
