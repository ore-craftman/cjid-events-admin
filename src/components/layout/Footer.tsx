import { Logo } from './Logo'

const eventsLinks = [
  { label: 'Upcoming Events', href: '#' },
  { label: 'Past Events', href: '#' },
]

const orgLinks = [
  { label: 'About CJID', href: 'https://thecjid.org/about/', external: true },
  { label: 'Contact', href: '#' },
  { label: 'Privacy Policy', href: '#' },
]

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
          <div>
            <Logo variant="light" />
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Centre for Journalism Innovation and Development.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Events</h3>
            <ul className="space-y-2">
              {eventsLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-zinc-400 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Organisation</h3>
            <ul className="space-y-2">
              {orgLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-zinc-800 pt-6">
          <p className="text-xs text-zinc-500">
            © 2026 Centre for Journalism Innovation and Development. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
