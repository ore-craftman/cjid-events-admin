import { Logo } from './Logo'

const eventsLinks = ['Upcoming Events', 'Past Events', 'Blog']
const orgLinks = ['About CJID', 'Contact', 'Privacy Policy']

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
                <li key={link}>
                  <a href="#" className="text-sm text-zinc-400 transition-colors hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Organisation</h3>
            <ul className="space-y-2">
              {orgLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-zinc-400 transition-colors hover:text-white">
                    {link}
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
