import { motion } from "framer-motion"
import { Award, ShieldCheck, Cog } from "lucide-react"
import clients from "../../data/clients"

const badges = [
  { icon: Award, label: "Quality" },
  { icon: ShieldCheck, label: "Reliability" },
  { icon: Cog, label: "Engineering Excellence" },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

function ClientsSection() {
  return (
    <section className="bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #0B2D5C 0.5px, transparent 0.5px)",
          backgroundSize: "30px 30px",
          opacity: 0.03,
        }}
      />

      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-[120px]">
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
          >
            Our Clients
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#0B2D5C] text-[34px] md:text-[42px] lg:text-[56px] font-extrabold leading-[1.1] mt-4"
          >
            Trusted by Industry Leaders
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#334155] text-lg leading-[1.7] mt-6"
          >
            HITECH GROUP has successfully delivered engineering, insulation, and industrial services
            to organizations across sugar, paper, food processing, manufacturing, and heavy
            engineering sectors.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {clients.map((client) => (
            <motion.div
              key={client.name}
              variants={cardVariants}
              className="bg-white border border-gray-100 rounded-[18px] p-8 flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:border-[#F4B400] hover:shadow-lg transition-all duration-300 min-h-[140px]"
            >
              <div className="w-[68px] h-[68px] rounded-full bg-[#F4B400]/10 flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-[#0B2D5C] tracking-tight">
                  {client.initials}
                </span>
              </div>
              <span className="text-sm font-semibold text-[#0F172A] leading-tight">
                {client.name}
              </span>
              <span className="text-[11px] text-[#94A3B8] mt-1">{client.domain}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <div className="bg-[#0B2D5C] rounded-[28px] px-8 md:px-16 py-12 md:py-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-[550px]">
              <h3 className="text-white text-2xl md:text-[30px] font-extrabold leading-[1.2]">
                Building Long-Term Industrial Partnerships
              </h3>
              <p className="text-[rgba(255,255,255,0.8)] mt-4 leading-relaxed">
                We believe in lasting relationships built on trust, consistent delivery, and a deep
                understanding of our clients&apos; industrial needs.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {badges.map((badge) => {
                const Icon = badge.icon
                return (
                  <div
                    key={badge.label}
                    className="flex items-center gap-2.5 bg-white/10 rounded-xl px-5 py-3"
                  >
                    <Icon size={18} className="text-[#F4B400] shrink-0" />
                    <span className="text-sm font-semibold text-white">{badge.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ClientsSection
