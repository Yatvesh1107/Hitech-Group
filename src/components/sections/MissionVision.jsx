import { motion } from "framer-motion"
import { Target, Eye, Award, TrendingUp } from "lucide-react"

const cards = [
  {
    icon: Target,
    title: "Mission",
    tagline: "Quality First",
    tagIcon: Award,
    points: [
      "Delivering reliable engineering solutions",
      "Quality workmanship in every project",
      "Customer satisfaction at the core",
      "Technical excellence across disciplines",
      "Safe working practices on site",
    ],
    paragraph:
      "Our mission is to deliver reliable engineering solutions through quality workmanship, disciplined processes and a strong customer-first approach. We bring technical excellence to every project while upholding safe working practices and protecting the interests of the industries we serve.",
  },
  {
    icon: Eye,
    title: "Vision",
    tagline: "Future Ready",
    tagIcon: TrendingUp,
    points: [
      "Becoming a trusted engineering partner",
      "Continuous innovation in our services",
      "Sustainable industrial solutions",
      "Long-term growth for clients and the group",
      "Industry leadership in our domains",
    ],
    paragraph:
      "Our vision is to be a trusted engineering partner recognised for continuous innovation and sustainable industrial solutions. We aim to grow alongside our clients, strengthen our technical depth and establish long-term leadership across every division we operate in.",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

function MissionVision() {
  return (
    <section className="bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%230B2D5C' stroke-width='1'%3E%3Cpath d='M24 0L48 24L24 48L0 24Z'/%3E%3Ccircle cx='24' cy='24' r='4'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-8 py-12 lg:py-12">
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
            Mission &amp; Vision
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
          >
            Driven by Purpose. Focused on Excellence.
          </motion.h2>

          <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
            HITECH GROUP is committed to delivering dependable industrial solutions while
            building long-term customer relationships through quality, innovation and technical
            expertise.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {cards.map((card) => {
            const Icon = card.icon
            const TagIcon = card.tagIcon
            return (
              <motion.div
                key={card.title}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="bg-white rounded-[24px] border border-gray-100 shadow-xl p-7 lg:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#F4B400]/10 flex items-center justify-center">
                  <Icon size={28} className="text-[#F4B400]" />
                </div>

                <h3 className="text-[#0B2D5C] text-[28px] font-extrabold tracking-wide mt-6">
                  {card.title}
                </h3>

                <p className="text-[#334155] leading-[1.8] mt-4">{card.paragraph}</p>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="grid grid-cols-1 gap-2.5">
                    {card.points.map((point) => (
                      <div key={point} className="flex items-center gap-3 text-sm text-[#334155]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400] shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 inline-flex items-center gap-2 bg-[#0B2D5C] text-white rounded-full px-5 py-2.5">
                  <TagIcon size={16} className="text-[#F4B400]" />
                  <span className="text-sm font-semibold">{card.tagline}</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#0B2D5C] rounded-[24px] mt-10 text-center px-8 py-14 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23F4B400' stroke-width='1'%3E%3Cpath d='M24 0L48 24L24 48L0 24Z'/%3E%3Ccircle cx='24' cy='24' r='4'/%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
          <p className="relative z-10 text-white text-xl md:text-2xl font-semibold leading-relaxed max-w-[760px] mx-auto">
            Engineering trust through quality, innovation and dependable industrial solutions.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default MissionVision
