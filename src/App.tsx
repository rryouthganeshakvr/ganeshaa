import { useState } from 'react'
import { motion } from 'framer-motion'
import { announcementContent } from './content/announcement'
import { Navigation } from './components/layout/Navigation'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Teachings } from './components/sections/Teachings'
import { Events } from './components/sections/Events'
import { Schedule } from './components/sections/Schedule'
import { LiveStream } from './components/sections/LiveStream'
import { Gallery } from './components/sections/Gallery'
import { SevaModal } from './components/sections/SevaModal'
import { Testimonials } from './components/sections/Testimonials'
import { Contact } from './components/sections/Contact'
import { ParticleField } from './components/effects/ParticleField'
import { FloatingOrbs } from './components/effects/FloatingOrbs'
import { ScrollProgress } from './components/effects/ScrollProgress'
import { CustomCursor } from './components/effects/CustomCursor'
import { SplashScreen } from './components/effects/SplashScreen'
import { FestivalBlast } from './components/effects/FestivalBlast'
import { AnnouncementBanner } from './components/ui/AnnouncementBanner'
import { BackToTop } from './components/ui/BackToTop'
import { AudioToggle } from './components/ui/AudioToggle'
import { SocialStrip } from './components/ui/SocialStrip'
import { Darshan } from './components/sections/Darshan'

function App() {
  const [sevaOpen, setSevaOpen] = useState(false)
  const [splashDone, setSplashDone] = useState(false)
  const [showBanner, setShowBanner] = useState(announcementContent.enabled)

  return (
    <>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}

      {showBanner && <AnnouncementBanner onDismiss={() => setShowBanner(false)} />}
      <FestivalBlast />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-dark-500 text-ivory-300 min-h-svh"
      >
        {/* Background effects */}
        <ParticleField />
        <FloatingOrbs />
        <ScrollProgress />
        <CustomCursor />

        {/* Navigation — shifts down when banner is visible */}
        <Navigation onOpenSeva={() => setSevaOpen(true)} bannerShown={showBanner} />

        {/* Main content */}
        <main id="main-content">
          <Hero onOpenSeva={() => setSevaOpen(true)} />
          <About />
          <Teachings />
          <Events />
          <Schedule />
          <LiveStream />
          <Darshan />
          <Gallery />
          <Testimonials />
          <Contact />
        </main>

        <Footer />

        <SevaModal open={sevaOpen} onClose={() => setSevaOpen(false)} />
        <SocialStrip />
        <AudioToggle />
        <BackToTop />
      </motion.div>
    </>
  )
}

export default App
