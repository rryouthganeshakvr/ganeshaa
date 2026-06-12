import { settings } from '../../content/settings'

const GmailIcon = () => (
  <svg viewBox="0 0 48 48" className="w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4caf50" d="M45 16.2l-5 2.75-5 4.75L35 40h7c1.657 0 3-1.343 3-3V16.2z"/>
    <path fill="#1e88e5" d="M3 16.2l3.714 1.498L13 23.7V40H6c-1.657 0-3-1.343-3-3V16.2z"/>
    <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"/>
    <path fill="#c62828" d="M3 12.298V16.2l10 7.5V11.2L9.876 8.859C9.132 8.301 8.228 8 7.298 8 4.924 8 3 9.924 3 12.298z"/>
    <path fill="#fbc02d" d="M45 12.298V16.2l-10 7.5V11.2l3.124-2.341C38.868 8.301 39.772 8 40.702 8 43.076 8 45 9.924 45 12.298z"/>
  </svg>
)

export function Footer() {
  const year = new Date().getFullYear()

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative pt-10 pb-4 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(0deg, #000 0%, rgba(10,5,0,0.98) 60%, transparent 100%)' }}
      />

      <div className="relative z-10 container-custom px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-7 border-b border-gold-900/40">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-saffron-600 flex items-center justify-center text-xl font-bold text-dark-500">
                ॐ
              </div>
              <div>
                <p className="font-cinzel font-bold text-gold-400 text-sm">Round Ramalayam Youth</p>
                <p className="font-inter text-ivory-600 text-xs tracking-widest">KOVVUR</p>
              </div>
            </div>
            <p className="text-ivory-700 text-xs leading-relaxed">
              Celebrating divine grace with devotion and community since 2004.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel font-semibold text-gold-500 tracking-wider mb-3 text-xs uppercase">
              Quick Links
            </h4>
            <ul className="space-y-1.5">
              {settings.navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-ivory-600 hover:text-gold-400 transition-colors duration-200 text-xs font-inter tracking-wide flex items-center gap-1.5"
                  >
                    <span className="text-gold-700 text-[10px]">✦</span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-cinzel font-semibold text-gold-500 tracking-wider mb-3 text-xs uppercase">
              Contact
            </h4>
            <ul className="space-y-2 text-xs text-ivory-600">
              <li className="flex gap-2">
                <span className="text-gold-500 mt-0.5 flex-shrink-0">📍</span>
                <span>{settings.contact.fullAddress}</span>
              </li>
              <li className="flex gap-2 items-start">
                <GmailIcon />
                <a
                  href={`mailto:${settings.contact.email}`}
                  className="hover:text-gold-400 transition-colors break-all"
                >
                  {settings.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-cinzel font-semibold text-gold-500 tracking-wider mb-3 text-xs uppercase">
              Follow Us
            </h4>
            <div className="space-y-2">
              <a
                href={settings.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 glass px-3 py-2 rounded-xl hover:border-gold-500/40 transition-colors duration-200 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none">
                  <defs>
                    <linearGradient id="ig-grad-footer" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F58529" />
                      <stop offset="30%" stopColor="#DD2A7B" />
                      <stop offset="65%" stopColor="#8134AF" />
                      <stop offset="100%" stopColor="#515BD4" />
                    </linearGradient>
                  </defs>
                  <rect x="2" y="2" width="20" height="20" rx="6" ry="6" fill="url(#ig-grad-footer)" />
                  <circle cx="12" cy="12" r="4.5" fill="none" stroke="white" strokeWidth="1.8" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
                </svg>
                <p className="text-xs text-ivory-300 group-hover:text-gold-400 transition-colors font-cinzel truncate">
                  {settings.social.instagramHandle}
                </p>
              </a>
              <a
                href={settings.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 glass px-3 py-2 rounded-xl hover:border-gold-500/40 transition-colors duration-200 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
                  <rect x="0" y="0" width="24" height="24" rx="5" fill="#FF0000" />
                  <path d="M9.5 15.5V8.5l6.5 3.5-6.5 3.5z" fill="white" />
                </svg>
                <p className="text-xs text-ivory-300 group-hover:text-gold-400 transition-colors font-cinzel truncate">
                  {settings.social.youtubeHandle}
                </p>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ivory-700">
          <p className="font-inter">© {year} {settings.organization}. All rights reserved.</p>
          <p className="font-cormorant text-sm text-gold-700 italic">{settings.siteTagline}</p>
        </div>
      </div>
    </footer>
  )
}
