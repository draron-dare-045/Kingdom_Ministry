import { motion } from 'framer-motion'
import { CheckCircle2, PhoneCall, GraduationCap } from 'lucide-react'
import { teachingHighlights, org } from '../data' // FIXED IMPORT PATH

export default function Activities() {
  return (
    <section className="relative py-24 bg-surface min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <p className="font-label text-xs uppercase tracking-[0.2em] text-gold font-bold mb-4">Ministry Focus</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-kingdomGreen mb-6">
            Teaching & Counselling Highlights
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            By the grace of God, we provide in-depth teaching and professional 
            counselling focused on spiritual maturity and emotional restoration.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {teachingHighlights.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mt-1 bg-kingdomGreen/10 p-2 rounded-lg">
                <CheckCircle2 size={20} className="text-kingdomGreen" />
              </div>
              <div>
                <span className="block font-label text-[10px] text-gold font-bold mb-1">HIGHLIGHT {index + 1}</span>
                <p className="text-ink font-medium leading-snug">{topic}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-kingdomGreen rounded-[2rem] p-8 md:p-12 text-center text-white relative overflow-hidden"
        >
          <h2 className="font-display text-3xl font-bold mb-4">And many more...</h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Give us a call for prayer, counselling, conferences, seminars, etc.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${org.phone}`} className="flex items-center justify-center gap-2 px-8 py-4 bg-gold rounded-full font-bold text-white hover:scale-105 transition-transform">
              <PhoneCall size={18} /> Call {org.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}