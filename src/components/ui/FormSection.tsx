interface FormSectionProps {
  title: string
  children: React.ReactNode
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="mb-5 text-base font-semibold text-zinc-900">{title}</h2>
      {children}
    </section>
  )
}
