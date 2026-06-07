import { motion } from 'framer-motion'
import { Navigation } from './components/layout/Navigation'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Teachings } from './components/sections/Teachings'
import { Events } from './components/sections/Events'
import { Gallery } from './components/sections/Gallery'
import { Donation } from './components/sections/Donation'
import { Testimonials } from './components/sections/Testimonials'
import { Contact } from './components/sections/Contact'
import { ParticleField } from './components/effects/ParticleField'
import { FloatingOrbs } from './components/effects/FloatingOrbs'
import { ScrollProgress } from './components/effects/ScrollProgress'
import { CustomCursor } from './components/effects/CustomCursor'

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative bg-dark-500 text-ivory-300 min-h-screen"
    >
      {/* Background effects */}
      <ParticleField />
      <FloatingOrbs />
      <ScrollProgress />
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Teachings />
        <Events />
        <Gallery />
        <Donation />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  )
}

export default App
