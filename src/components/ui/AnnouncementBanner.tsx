import { announcementContent } from '../../content/announcement'

interface Props {
  onDismiss: () => void
}

export function AnnouncementBanner({ onDismiss }: Props) {
  const scrollTo = (href: string) => {
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const dismiss = () => {
    onDismiss()
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center gap-3 px-10 h-10"
      style={{
        background: 'linear-gradient(90deg, rgba(10,5,0,0.97) 0%, rgba(28,12,0,0.98) 50%, rgba(10,5,0,0.97) 100%)',
        borderBottom: '1px solid rgba(212,175,55,0.2)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <span className="text-ivory-400 text-xs font-inter truncate">{announcementContent.message}</span>
      {announcementContent.linkHref && (
        <button
          onClick={() => scrollTo(announcementContent.linkHref)}
          className="font-cinzel text-gold-400 hover:text-gold-300 text-xs tracking-wide transition-colors flex-shrink-0 underline underline-offset-2"
        >
          {announcementContent.linkLabel} →
        </button>
      )}
      <button
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-4 text-ivory-700 hover:text-ivory-300 transition-colors text-sm leading-none"
      >
        ✕
      </button>
    </div>
  )
}
