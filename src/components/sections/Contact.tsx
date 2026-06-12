import { useState } from 'react'
import { motion } from 'framer-motion'
import { contactContent } from '../../content/contact'
import { settings } from '../../content/settings'
import { SectionTitle } from '../ui/SectionTitle'
import { staggerContainer, fadeInLeft, fadeInRight, fadeInUp } from '../../utils/animations'

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="none">
    <defs>
      <linearGradient id="ig-contact-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F58529" />
        <stop offset="30%" stopColor="#DD2A7B" />
        <stop offset="65%" stopColor="#8134AF" />
        <stop offset="100%" stopColor="#515BD4" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="6" ry="6" fill="url(#ig-contact-grad)" />
    <circle cx="12" cy="12" r="4.5" fill="none" stroke="white" strokeWidth="1.8" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
  </svg>
)

const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
    <rect x="0" y="0" width="24" height="24" rx="5" fill="#FF0000" />
    <path d="M9.5 15.5V8.5l6.5 3.5-6.5 3.5z" fill="white" />
  </svg>
)

const GmailIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg">
    <path fill="#4caf50" d="M45 16.2l-5 2.75-5 4.75L35 40h7c1.657 0 3-1.343 3-3V16.2z"/>
    <path fill="#1e88e5" d="M3 16.2l3.714 1.498L13 23.7V40H6c-1.657 0-3-1.343-3-3V16.2z"/>
    <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"/>
    <path fill="#c62828" d="M3 12.298V16.2l10 7.5V11.2L9.876 8.859C9.132 8.301 8.228 8 7.298 8 4.924 8 3 9.924 3 12.298z"/>
    <path fill="#fbc02d" d="M45 12.298V16.2l-10 7.5V11.2l3.124-2.341C38.868 8.301 39.772 8 40.702 8 43.076 8 45 9.924 45 12.298z"/>
  </svg>
)

const renderIcon = (icon: string) => {
  if (icon === 'instagram') return <InstagramIcon />
  if (icon === 'youtube') return <YouTubeIcon />
  if (icon === 'gmail') return <GmailIcon />
  return <span className="text-2xl">{icon}</span>
}

export function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(false)

    const appsScriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL
    if (appsScriptUrl) {
      const params = new URLSearchParams()
      params.append('type', 'enquiry')
      params.append('name', form.name.trim())
      params.append('phone', form.phone.trim())
      params.append('email', form.email.trim())
      params.append('subject', form.subject.trim())
      params.append('message', form.message.trim())
      try {
        await fetch(`${appsScriptUrl}?${params.toString()}`, { method: 'GET', mode: 'no-cors' })
      } catch {
        setError(true)
      }
    }

    setSubmitting(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setForm({ name: '', phone: '', email: '', subject: '', message: '' })
  }

  const inputClass =
    'w-full glass rounded-xl px-5 py-3.5 text-ivory-200 placeholder-ivory-700 font-inter text-sm outline-none focus:border-gold-500/50 focus:shadow-gold-sm transition-all duration-300 bg-transparent border border-gold-900/30'

  return (
    <section id="contact" className="section-padding section-bg relative overflow-hidden">
      <div
        className="absolute left-0 bottom-0 w-96 h-96 opacity-8 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="container-custom relative z-10">
        <SectionTitle
          badge={contactContent.badge}
          title={contactContent.title}
          titleAccent={contactContent.titleAccent}
          subtitle={contactContent.subtitle}
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInLeft} className="space-y-5 mb-8">
              {contactContent.info.map((item, i) => {
                const inner = (
                  <>
                    <div className="w-12 h-12 glass-gold rounded-xl flex items-center justify-center flex-shrink-0">
                      {renderIcon(item.icon)}
                    </div>
                    <div>
                      <p className="font-cinzel font-bold text-gold-400 text-sm mb-1">{item.title}</p>
                      {item.lines.map((line, j) => (
                        <p key={j} className="text-ivory-400 font-inter text-sm">{line}</p>
                      ))}
                    </div>
                  </>
                )
                return item.href ? (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass rounded-2xl p-5 flex items-start gap-4 glass-hover"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={i} className="glass rounded-2xl p-5 flex items-start gap-4 glass-hover">
                    {inner}
                  </div>
                )
              })}
            </motion.div>


            {/* Social links */}
            <motion.div variants={fadeInUp} className="flex gap-3 mt-5">
              <a
                href={settings.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 glass rounded-2xl p-4 text-center hover:glass-gold transition-all duration-300 group"
              >
                <div className="flex justify-center mb-1"><InstagramIcon /></div>
                <p className="font-cinzel text-xs text-ivory-500 group-hover:text-gold-400 transition-colors">Instagram</p>
              </a>
              <a
                href={settings.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 glass rounded-2xl p-4 text-center hover:glass-gold transition-all duration-300 group"
              >
                <div className="flex justify-center mb-1"><YouTubeIcon /></div>
                <p className="font-cinzel text-xs text-ivory-500 group-hover:text-gold-400 transition-colors">YouTube</p>
              </a>
              <a
                href={`https://mail.google.com/mail/?view=cm&to=${settings.contact.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 glass rounded-2xl p-4 text-center hover:glass-gold transition-all duration-300 group"
              >
                <div className="flex justify-center mb-1"><GmailIcon className="w-6 h-6" /></div>
                <p className="font-cinzel text-xs text-ivory-500 group-hover:text-gold-400 transition-colors">Email</p>
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="glass-gold rounded-3xl p-8 md:p-10">
              <h3 className="font-cinzel font-bold text-gold-300 text-xl mb-6">Send a Message</h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-5xl mb-4">🙏</p>
                  <p className="font-cinzel text-gold-400 text-xl font-bold mb-2">
                    {contactContent.form.successMessage}
                  </p>
                  <p className="text-ivory-500 font-inter text-sm">We will respond to your message shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={contactContent.form.namePlaceholder}
                      required
                      className={inputClass}
                    />
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Mobile Number *"
                      required
                      maxLength={10}
                      inputMode="numeric"
                      pattern="[6-9][0-9]{9}"
                      title="Enter a valid 10-digit Indian mobile number"
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={contactContent.form.emailPlaceholder}
                      required
                      className={inputClass}
                    />
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder={contactContent.form.subjectPlaceholder}
                      className={inputClass}
                    />
                  </div>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={contactContent.form.messagePlaceholder}
                    required
                    rows={5}
                    className={`${inputClass} resize-none`}
                  />
                  {error && (
                    <p className="text-red-400 text-xs text-center font-inter">Something went wrong. Please try again.</p>
                  )}
                  <button type="submit" disabled={submitting} className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                    {submitting ? 'Sending…' : contactContent.form.submitLabel}
                  </button>
                  <p className="text-ivory-700 text-xs font-inter text-center">
                    Your message is sent directly to our team.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
