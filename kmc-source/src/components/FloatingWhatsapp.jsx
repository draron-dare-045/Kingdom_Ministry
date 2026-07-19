import { motion } from 'framer-motion'
import { WhatsappIcon } from './BrandIcons'
import { org } from '../data'

export default function FloatingWhatsapp() {
  const message = encodeURIComponent(`Hello ${org.name}, I'd like to get in touch.`)

  return (
    <motion.a
      href={`https://wa.me/${org.whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 1.2 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-lift flex items-center justify-center"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      <WhatsappIcon size={30} className="relative" />
    </motion.a>
  )
}
