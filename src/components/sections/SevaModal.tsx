import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { donationContent } from '../../content/donation'
import { SectionTitle } from '../ui/SectionTitle'
import { GlassCard } from '../ui/GlassCard'
import { staggerContainer, fadeInUp, fadeInLeft } from '../../utils/animations'

const UPI_QR_VALUE = `upi://pay?pa=${donationContent.bankDetails.upiId}&pn=Round%20Ramalayam%20Youth%20Kovvur&tn=Donation&cu=INR`

interface Props {
  open: boolean
  onClose: () => void
}

type FormState = {
  name: string
  phone: string
  email: string
  amount: string
  txnId: string
  notes: string
  receipt: File | null
}

type StringFields = Omit<FormState, 'receipt'>

const EMPTY_FORM: FormState = { name: '', phone: '', email: '', amount: '', txnId: '', notes: '', receipt: null }

const field = (hasError: boolean) =>
  `w-full glass rounded-xl px-4 py-3 text-ivory-200 placeholder-ivory-700 font-inter text-sm bg-transparent outline-none transition-all duration-300 border ${hasError ? 'border-red-500/60 focus:border-red-400/80' : 'border-gold-900/30 focus:border-gold-500/50'}`

function validate(form: FormState) {
  const e: Record<string, string> = {}
  if (!form.name.trim()) e.name = 'Name is required'
  if (!/^[6-9]\d{9}$/.test(form.phone.trim())) e.phone = 'Enter a valid 10-digit Indian mobile number'
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address'
  if (!form.amount || Number(form.amount) <= 0) e.amount = 'Enter the amount you paid'
  if (form.txnId.trim() && form.txnId.trim().length < 6) e.txnId = 'Transaction ID must be at least 6 characters'
  if (!form.receipt) e.receipt = 'Please upload your payment screenshot'
  return e
}

async function compressImage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve((reader.result as string).split(',')[1])
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const canvas = document.createElement('canvas')
      let { width, height } = img
      const maxDim = 1200
      if (width > maxDim || height > maxDim) {
        const ratio = Math.min(maxDim / width, maxDim / height)
        width = Math.round(width * ratio)
        height = Math.round(height * ratio)
      }
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, width, height)
      let quality = 0.82
      let result = canvas.toDataURL('image/jpeg', quality)
      // Reduce quality until roughly under 800 KB
      while (result.length > 1_100_000 && quality > 0.3) {
        quality -= 0.1
        result = canvas.toDataURL('image/jpeg', quality)
      }
      resolve(result.split(',')[1])
    }
    img.src = url
  })
}

export function SevaModal({ open, onClose }: Props) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [previewUrl, setPreviewUrl] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  useEffect(() => {
    if (form.receipt?.type.startsWith('image/')) {
      const url = URL.createObjectURL(form.receipt)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
    setPreviewUrl('')
  }, [form.receipt])

  const set = (key: keyof StringFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, receipt: 'File must be under 5MB' }))
      return
    }
    setForm(f => ({ ...f, receipt: file }))
    setErrors(prev => ({ ...prev, receipt: '' }))
  }

  const clearReceipt = (e: React.MouseEvent) => {
    e.preventDefault()
    setForm(f => ({ ...f, receipt: null }))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    const appsScript = import.meta.env.VITE_APPS_SCRIPT_URL as string | undefined
    if (!appsScript) { setStatus('error'); return }

    setSubmitting(true)
    try {
      // 1. Send text form data via GET → saves to sheet + sends email
      const params = new URLSearchParams()
      params.append('type', 'payment')
      params.append('name', form.name.trim())
      params.append('phone', form.phone.trim())
      params.append('email', form.email.trim())
      params.append('amount_paid', `₹${form.amount}`)
      params.append('txn_id', form.txnId.trim())
      params.append('notes', form.notes.trim())
      await fetch(`${appsScript}?${params.toString()}`, { method: 'GET', mode: 'no-cors' })

      // 2. Upload receipt image to Drive via POST (Apps Script doPost)
      if (form.receipt) {
        const base64Data = await compressImage(form.receipt)
        const mimeType = form.receipt.type.startsWith('image/') ? 'image/jpeg' : form.receipt.type
        await fetch(appsScript, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({
            type: 'upload_receipt',
            phone: form.phone.trim(),
            fileName: form.receipt.name,
            mimeType,
            fileBase64: base64Data,
          }),
        })
      }

      setStatus('success')
      setForm(EMPTY_FORM)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch {
      setStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setStatus('idle')
    setErrors({})
    setForm(EMPTY_FORM)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-x-3 md:inset-x-10 lg:inset-x-20 top-[4vh] bottom-[4vh] z-[61] rounded-3xl overflow-hidden flex flex-col"
            style={{ background: 'rgba(8,4,0,0.98)', border: '1px solid rgba(212,175,55,0.25)' }}
          >
            {/* Sticky header */}
            <div
              className="flex items-center justify-between px-6 md:px-10 py-4 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(212,175,55,0.15)', background: 'rgba(8,4,0,0.95)' }}
            >
              <p className="font-cinzel text-gold-400 tracking-widest text-sm uppercase">Serve with Love</p>
              <button
                onClick={onClose}
                className="w-9 h-9 glass rounded-full flex items-center justify-center text-ivory-500 hover:text-gold-400 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 px-6 py-8 md:px-10">
              <SectionTitle
                badge={donationContent.badge}
                title={donationContent.title}
                titleAccent={donationContent.titleAccent}
                subtitle={donationContent.subtitle}
              />

              {/* Impact stats */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
              >
                {donationContent.impactStats.map((stat, i) => (
                  <motion.div key={i} variants={fadeInUp} className="glass rounded-2xl p-5 text-center">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <p className="font-cinzel text-xl font-bold text-gradient-gold">{stat.value}</p>
                    <p className="text-ivory-600 text-xs mt-1 font-inter">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-10 items-start">
                {/* Left: Causes */}
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
                  <motion.h3 variants={fadeInLeft} className="font-cinzel text-2xl font-bold text-ivory-200 mb-6">
                    Where Your Offering Goes
                  </motion.h3>
                  {donationContent.causes.map((cause, i) => (
                    <motion.div key={i} variants={fadeInLeft} className="glass rounded-2xl p-5 flex items-start gap-4 glass-hover cursor-pointer">
                      <div className="w-12 h-12 glass-gold rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                        {cause.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-cinzel font-bold text-ivory-200 text-base mb-1">{cause.title}</h4>
                        <p className="text-ivory-600 text-sm font-inter leading-relaxed">{cause.description}</p>
                      </div>
                    </motion.div>
                  ))}
                  <motion.p variants={fadeInUp} className="text-ivory-700 text-xs font-inter leading-relaxed mt-4 p-4 glass rounded-xl">
                    {donationContent.disclaimer}
                  </motion.p>
                </motion.div>

                {/* Right: QR + Confirmation Form */}
                <div className="space-y-6">
                  {/* QR Card */}
                  <GlassCard variant="gold" className="p-8 text-center" delay={0.1}>
                    <h3 className="font-cinzel font-bold text-gold-300 text-xl mb-6">Pay via UPI / QR Code</h3>
                    <div className="flex justify-center mb-4">
                      <div className="bg-white rounded-2xl p-4 shadow-gold">
                        <QRCodeSVG
                          value={UPI_QR_VALUE}
                          size={180}
                          bgColor="#ffffff"
                          fgColor="#1a0a00"
                          level="M"
                          marginSize={0}
                        />
                      </div>
                    </div>
                    <p className="text-ivory-500 text-sm font-inter mb-3">{donationContent.qrNote}</p>
                    <div className="glass rounded-xl px-5 py-3 inline-block">
                      <p className="font-cinzel text-gold-400 font-bold">UPI: {donationContent.bankDetails.upiId}</p>
                    </div>
                  </GlassCard>

                  {/* Payment Confirmation Form */}
                  <div
                    className="rounded-3xl p-6 md:p-8"
                    style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.2)' }}
                  >
                    <h3 className="font-cinzel font-bold text-gold-300 text-lg mb-1">Confirm Your Seva</h3>
                    <p className="text-ivory-600 text-xs font-inter mb-6 leading-relaxed">
                      After completing the UPI payment, submit your details below. Your information is confidential.
                    </p>

                    {status === 'success' ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                      >
                        <p className="text-5xl mb-4">🙏</p>
                        <p className="font-cinzel text-gold-400 text-lg font-bold mb-2">Submission Received</p>
                        <p className="text-ivory-500 text-sm font-inter mb-5">
                          Thank you for your seva. We will verify and confirm shortly. Jai Ganesh!
                        </p>
                        <button onClick={resetForm} className="text-xs text-ivory-600 hover:text-gold-400 underline transition-colors font-inter">
                          Submit another confirmation
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div>
                          <input value={form.name} onChange={set('name')} placeholder="Full Name *" className={field(!!errors.name)} />
                          {errors.name && <p className="text-red-400 text-xs mt-1 font-inter">{errors.name}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <input value={form.phone} onChange={set('phone')} placeholder="Mobile Number *" maxLength={10} inputMode="numeric" className={field(!!errors.phone)} />
                            {errors.phone && <p className="text-red-400 text-xs mt-1 font-inter">{errors.phone}</p>}
                          </div>
                          <div>
                            <input type="email" value={form.email} onChange={set('email')} placeholder="Email (optional)" className={field(!!errors.email)} />
                            {errors.email && <p className="text-red-400 text-xs mt-1 font-inter">{errors.email}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <input type="number" value={form.amount} onChange={set('amount')} placeholder="Amount Paid (₹) *" min="1" className={field(!!errors.amount)} />
                            {errors.amount && <p className="text-red-400 text-xs mt-1 font-inter">{errors.amount}</p>}
                          </div>
                          <div>
                            <input value={form.txnId} onChange={set('txnId')} placeholder="UPI Transaction ID (optional)" className={field(!!errors.txnId)} />
                            {errors.txnId && <p className="text-red-400 text-xs mt-1 font-inter">{errors.txnId}</p>}
                          </div>
                        </div>

                        {/* Receipt Upload */}
                        <div>
                          <label className="block cursor-pointer">
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*,.pdf"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                            {form.receipt ? (
                              <div
                                className="glass rounded-xl p-3 flex items-center gap-3 border border-gold-500/40"
                                onClick={e => e.preventDefault()}
                              >
                                {previewUrl ? (
                                  <img src={previewUrl} alt="Receipt preview" className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                                ) : (
                                  <div className="w-14 h-14 glass-gold rounded-lg flex items-center justify-center text-2xl flex-shrink-0">📄</div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="text-ivory-200 text-sm font-inter truncate">{form.receipt.name}</p>
                                  <p className="text-ivory-600 text-xs font-inter">{(form.receipt.size / 1024).toFixed(0)} KB • Tap to change</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={clearReceipt}
                                  className="text-ivory-600 hover:text-red-400 transition-colors text-lg px-1"
                                  aria-label="Remove file"
                                >✕</button>
                              </div>
                            ) : (
                              <div className={`glass rounded-xl p-5 border-2 border-dashed transition-colors text-center ${errors.receipt ? 'border-red-500/60' : 'border-gold-900/40 hover:border-gold-500/50'}`}>
                                <p className="text-3xl mb-2">📸</p>
                                <p className="text-ivory-300 text-sm font-inter font-medium">Upload Payment Screenshot *</p>
                                <p className="text-ivory-700 text-xs font-inter mt-1">JPG, PNG or PDF · Max 5MB</p>
                              </div>
                            )}
                          </label>
                          {errors.receipt && <p className="text-red-400 text-xs mt-1 font-inter">{errors.receipt}</p>}
                        </div>

                        <textarea
                          value={form.notes}
                          onChange={set('notes')}
                          placeholder="Additional notes (optional)"
                          rows={2}
                          className="w-full glass rounded-xl px-4 py-3 text-ivory-200 placeholder-ivory-700 font-inter text-sm bg-transparent outline-none border border-gold-900/30 focus:border-gold-500/50 transition-all resize-none"
                        />

                        {status === 'error' && (
                          <p className="text-red-400 text-xs text-center font-inter py-1">
                            Submission failed. Please try again or email us directly.
                          </p>
                        )}

                        <button type="submit" disabled={submitting} className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity">
                          {submitting ? 'Submitting…' : 'Submit Confirmation'}
                        </button>

                        <p className="text-ivory-700 text-xs font-inter text-center">
                          🔒 Your details are confidential and only accessible to our team.
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
