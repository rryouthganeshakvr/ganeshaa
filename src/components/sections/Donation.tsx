import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { donationContent } from '../../content/donation'
import { SectionTitle } from '../ui/SectionTitle'
import { GlassCard } from '../ui/GlassCard'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight, scaleIn } from '../../utils/animations'

const UPI_QR_VALUE = `upi://pay?pa=${donationContent.bankDetails.upiId}&pn=Round%20Ramalayam%20Youth%20Kovvur&tn=Donation&cu=INR`

export function Donation() {
  return (
    <section id="donation" className="section-padding section-bg relative overflow-hidden">
      <div
        className="absolute right-0 top-0 w-96 h-96 opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="container-custom relative z-10">
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
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
        >
          {donationContent.impactStats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="glass rounded-2xl p-5 text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="font-cinzel text-xl font-bold text-gradient-gold">{stat.value}</p>
              <p className="text-ivory-600 text-xs mt-1 font-inter">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: Causes */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            <motion.h3
              variants={fadeInLeft}
              className="font-cinzel text-2xl font-bold text-ivory-200 mb-6"
            >
              Where Your Offering Goes
            </motion.h3>
            {donationContent.causes.map((cause, i) => (
              <motion.div
                key={i}
                variants={fadeInLeft}
                className="glass rounded-2xl p-5 flex items-start gap-4 glass-hover cursor-pointer"
              >
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

          {/* Right: Payment details */}
          <div className="space-y-6">
            {/* QR + UPI */}
            <GlassCard variant="gold" className="p-8 text-center" delay={0.1}>
              <h3 className="font-cinzel font-bold text-gold-300 text-xl mb-6">
                Pay via UPI / QR Code
              </h3>
              <div className="flex justify-center mb-4">
                <div className="bg-white rounded-2xl p-4 shadow-gold">
                  <QRCodeSVG
                    value={UPI_QR_VALUE}
                    size={180}
                    bgColor="#ffffff"
                    fgColor="#1a0a00"
                    level="M"
                    includeMargin={false}
                  />
                </div>
              </div>
              <p className="text-ivory-500 text-sm font-inter mb-3">{donationContent.qrNote}</p>
              <div className="glass rounded-xl px-5 py-3 inline-block">
                <p className="font-cinzel text-gold-400 font-bold">
                  UPI: {donationContent.bankDetails.upiId}
                </p>
              </div>
            </GlassCard>

          </div>
        </div>
      </div>
    </section>
  )
}
