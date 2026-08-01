import { motion } from "framer-motion"
import {
  ShieldCheck,
  HardHat,
  Cog,
  Lightbulb,
  Handshake,
  Award,
} from "lucide-react"

const values = [
  {
    icon: ShieldCheck,
    title: "Quality",
    description:
      "Delivering dependable industrial solutions through consistent quality standards and attention to detail.",
  },
  {
    icon: HardHat,
    title: "Safety",
    description:
      "Prioritizing safe work practices, compliance and responsible execution across every project.",
  },
  {
    icon: Cog,
    title: "Technical Excellence",
    description:
      "Applying engineering knowledge, industry experience and practical expertise to solve complex challenges.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Continuously improving processes and embracing modern technologies to enhance industrial performance.",
  },
  {
    icon: Handshake,
    title: "Customer Commitment",
    description:
      "Building long-term relationships through transparency, reliability and responsive service.",
  },
  {
    icon: Award,
    title: "Integrity",
    description:
      "Operating with professionalism, accountability and ethical business practices in every engagement.",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

function CoreValues() {
  return (
    <section className="bg-[#F8FAFC]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-8 lg:py-8">
        <motion.div
          className="max-w-[720px] mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
          >
            Core Values
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
          >
            The Principles That Drive Every Project
          </motion.h2>

          <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
            HITECH GROUP&rsquo;s success is built on strong values, engineering discipline and
            lasting customer relationships.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {values.map((value) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="relative bg-white rounded-[24px] border border-gray-100 shadow-sm p-7 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#F4B400] rounded-t-[24px] opacity-80" />

                <div className="w-14 h-14 rounded-xl bg-[#F4B400]/10 flex items-center justify-center">
                  <Icon size={26} className="text-[#F4B400]" />
                </div>

                <h3 className="font-bold text-[#0B2D5C] text-lg mt-5">{value.title}</h3>
                <p className="text-sm text-[#334155] leading-[1.7] mt-2">{value.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#0B2D5C] rounded-[24px] mt-10 text-center px-8 py-14"
        >
          <p className="text-white text-xl md:text-2xl font-semibold leading-relaxed">
            Engineering Excellence begins with Strong Values.
          </p>
          <p className="text-[rgba(255,255,255,0.75)] mt-3 leading-relaxed max-w-[640px] mx-auto">
            Every solution we deliver reflects our commitment to quality, integrity and customer
            success.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default CoreValues
