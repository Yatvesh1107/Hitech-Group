import { motion } from "framer-motion"
import {
  Building2,
  Layers,
  Handshake,
  TrendingUp,
  Award,
  ShieldCheck,
  BadgeCheck,
  Cog,
  ThumbsUp,
  Check,
} from "lucide-react"

const milestones = [
  {
    icon: Building2,
    title: "Strong Foundation",
    description: "Building expertise in industrial services with disciplined engineering practices.",
  },
  {
    icon: Layers,
    title: "Expanded Capabilities",
    description:
      "Broadened offerings across industrial insulation, ultrasonic inspection and engineering services.",
  },
  {
    icon: Handshake,
    title: "Trusted Partnerships",
    description: "Long-term relationships built across sugar, power, paper and heavy engineering industries.",
  },
  {
    icon: TrendingUp,
    title: "Future Ready",
    description: "Continuing to deliver innovative and dependable industrial solutions for evolving requirements.",
  },
]

const highlightPoints = [
  { icon: Award, label: "Engineering Excellence" },
  { icon: ShieldCheck, label: "Reliable Solutions" },
  { icon: BadgeCheck, label: "Quality Driven" },
]

const chips = [
  { icon: Cog, label: "Industrial Expertise" },
  { icon: BadgeCheck, label: "Quality Focus" },
  { icon: ThumbsUp, label: "Customer Satisfaction" },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

function OurJourney() {
  return (
    <section className="bg-[#F8FAFC]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-24">
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
            Our Journey
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
          >
            Growing Through Innovation, Quality &amp; Trust
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-[#334155] leading-[1.8] mt-4"
          >
            HITECH GROUP has continuously expanded its expertise to meet evolving industrial
            requirements — through quality workmanship, strong technical knowledge and
            customer-focused solutions.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center mt-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="hidden lg:block absolute left-[31px] top-6 bottom-6 w-px bg-[#E2E8F0]" />
            <div className="space-y-6">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon
                return (
                  <motion.div
                    key={milestone.title}
                    variants={itemVariants}
                    className="relative flex gap-6"
                  >
                    <div className="w-14 h-14 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0 z-10">
                      <Icon size={24} className="text-[#F4B400]" />
                    </div>
                    <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-6 flex-1 hover:-translate-y-1 hover:shadow-lg hover:border-[#F4B400] transition-all duration-300">
                      <span className="text-xs font-bold text-[#F4B400] tracking-wider">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-bold text-[#0B2D5C] text-lg mt-1">{milestone.title}</h3>
                      <p className="text-sm text-[#334155] leading-[1.7] mt-1.5">
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-lg:mt-6"
          >
            <div className="relative">
              <div className="rounded-[24px] overflow-hidden">
                <img
                  src="/images/home/home-about-main.png"
                  alt="HITECH GROUP engineering operations"
                  className="w-full h-[420px] md:h-[520px] object-cover"
                />
              </div>

              <div className="absolute -bottom-8 -right-3 md:-right-6 rounded-[20px] overflow-hidden shadow-lg w-[140px] md:w-[170px]">
                <img
                  src="/images/home/home-about-small.png"
                  alt="Engineering detail"
                  className="w-full h-[110px] md:h-[130px] object-cover"
                />
              </div>

              <div className="absolute top-6 -left-3 md:-left-6 bg-white/90 backdrop-blur-md rounded-[24px] shadow-2xl p-5 max-w-[240px]">
                <h4 className="font-bold text-[#0B2D5C] text-sm">Built on</h4>
                <ul className="mt-3 space-y-2">
                  {highlightPoints.map((point) => {
                    const Icon = point.icon
                    return (
                      <li key={point.label} className="flex items-center gap-2.5 text-xs text-[#334155]">
                        <Icon size={16} className="text-[#F4B400] shrink-0" />
                        <span>{point.label}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {chips.map((chip) => {
            const Icon = chip.icon
            return (
              <motion.div
                key={chip.label}
                variants={itemVariants}
                className="inline-flex items-center gap-2.5 bg-white rounded-full border border-gray-100 shadow-sm px-6 py-3"
              >
                <Icon size={18} className="text-[#F4B400]" />
                <span className="font-medium text-[#0B2D5C] text-sm">{chip.label}</span>
                <Check size={16} className="text-[#F4B400]" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default OurJourney
