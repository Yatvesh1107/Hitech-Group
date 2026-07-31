import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  BadgeCheck,
  ShieldCheck,
  ClipboardCheck,
  TrendingUp,
  Check,
} from "lucide-react"

const certCards = [
  {
    icon: BadgeCheck,
    title: "Quality Management",
    description:
      "Structured quality processes aligned with international standards to ensure consistent project outcomes.",
  },
  {
    icon: ShieldCheck,
    title: "Safety Commitment",
    description:
      "Comprehensive safety protocols and practices to protect personnel and operational environments.",
  },
  {
    icon: ClipboardCheck,
    title: "Industry Compliance",
    description:
      "Adherence to applicable industry regulations, codes, and statutory requirements across all projects.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    description:
      "Ongoing evaluation and refinement of processes to enhance performance and service quality.",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

function Certifications() {
  return (
    <section className="bg-[#F8FAFC] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #0B2D5C 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.04,
        }}
      />

      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-8 lg:py-12">
        <div className="text-center max-w-[700px] mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
          >
            Quality &amp; Certifications
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#0B2D5C] text-[34px] md:text-[42px] lg:text-[52px] font-extrabold leading-[1.1] mt-3"
          >
            Committed to Quality, Safety &amp; Engineering Excellence
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#334155] text-lg leading-[1.7] mt-4"
          >
            HITECH GROUP follows structured quality processes and maintains internationally
            recognized standards across all operations. Our commitment to quality management
            ensures every project meets the highest expectations of performance and reliability.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="bg-white border border-gray-200 rounded-[24px] p-10 shadow-lg text-center">
              <div className="w-20 h-20 rounded-2xl bg-[#F4B400]/10 flex items-center justify-center mx-auto mb-6">
                <BadgeCheck size={40} className="text-[#F4B400]" />
              </div>

              <h3 className="text-2xl font-extrabold text-[#0B2D5C]">ISO 9001:2015</h3>
              <p className="text-[#F4B400] font-semibold text-sm tracking-[1px] uppercase mt-1">
                Certified Company
              </p>

              <div className="w-12 h-[2px] bg-[#F4B400] mx-auto my-6" />

              <p className="text-[#334155] leading-relaxed">
                HITECH GROUP is committed to maintaining a quality management system that meets
                the requirements of ISO 9001:2015, ensuring consistent service delivery and
                customer satisfaction across all our business divisions.
              </p>

              <div className="mt-6 space-y-2.5 text-left">
                {[
                  "Quality Management System",
                  "Process-Driven Approach",
                  "Customer Focused Delivery",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-[#334155]">
                    <Check size={16} className="text-[#F4B400] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {certCards.map((card) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.title}
                  variants={cardVariants}
                  className="bg-white border border-gray-100 rounded-[20px] p-7 hover:-translate-y-1 hover:border-[#F4B400] hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F4B400]/10 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-[#F4B400]" />
                  </div>
                  <h4 className="font-bold text-[#0F172A]">{card.title}</h4>
                  <p className="text-sm text-[#334155] mt-2 leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14"
        >
          <div className="bg-[#0B2D5C] rounded-[24px] px-8 md:px-16 py-12 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-[600px]">
              <h3 className="text-white text-2xl md:text-[30px] font-extrabold leading-[1.2]">
                Delivering Reliable Engineering Solutions with Certified Quality
              </h3>
              <p className="text-[rgba(255,255,255,0.8)] mt-4 leading-relaxed">
                From quality management to safety compliance, every project is backed by our
                commitment to certified standards.
              </p>
            </div>
            <Link
              to="/about"
              className="h-14 px-8 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl inline-flex items-center justify-center hover:bg-[#d9a000] transition-colors shrink-0"
            >
              View Our Capabilities
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Certifications
