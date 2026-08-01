import { motion } from "framer-motion"
import { Factory, Cog, BadgeCheck, Handshake, Check } from "lucide-react"
import aboutMain from "@/assets/images/home/home-about-main.png"
import aboutSmall from "@/assets/images/home/home-about-small.png"

const highlights = [
  {
    icon: Factory,
    title: "Industrial Solutions",
    description: "Practical, dependable solutions engineered for real industrial environments.",
  },
  {
    icon: Cog,
    title: "Engineering Expertise",
    description: "Specialized technical knowledge across insulation and testing disciplines.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Commitment",
    description: "Structured processes and standards that protect every project outcome.",
  },
  {
    icon: Handshake,
    title: "Customer Focus",
    description: "Solutions shaped around each client's operational priorities and goals.",
  },
]

const experiencePoints = [
  "Trusted Industrial Expertise",
  "Engineering Excellence",
  "Multi-Division Solutions",
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

function WhoWeAre() {
  return (
    <section className="bg-white relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-15 lg:py-15">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="rounded-[24px] overflow-hidden">
                <img
                  src={aboutMain}
                  alt="HITECH GROUP industrial operations"
                  className="w-full h-[420px] md:h-[500px] object-cover"
                />
              </div>

              <div className="absolute -top-4 -right-4 rounded-[20px] overflow-hidden shadow-lg w-[160px] md:w-[200px]">
                <img
                  src={aboutSmall}
                  alt="Engineering detail"
                  className="w-full h-[110px] md:h-[140px] object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-4 md:left-0 bg-white rounded-[20px] shadow-2xl p-5 max-w-[280px]">
                <h4 className="font-bold text-[#0B2D5C] text-sm">
                  Experience That Delivers
                </h4>
                <ul className="mt-3 space-y-2">
                  {experiencePoints.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-xs text-[#334155]">
                      <Check size={14} className="text-[#F4B400] shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="absolute -bottom-6 right-8 w-16 h-[3px] bg-[#F4B400] rounded-full hidden md:block" />
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span
              variants={itemVariants}
              className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
            >
              Who We Are
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
            >
              Building Reliable Industrial Solutions Through Innovation &amp; Expertise
            </motion.h2>

            <motion.div variants={itemVariants} className="mt-6 space-y-4 text-[#334155] leading-[1.8]">
              <p>
                HITECH GROUP is an established industrial engineering group headquartered in
                Kolhapur, Maharashtra. We bring together specialized capabilities in industrial
                insulation, ultrasonic inspection, and engineering services to support demanding
                industrial environments.
              </p>
              <p>
                Our strength lies in our multi-division structure. Each division focuses on its
                own technical discipline while working within shared quality standards and
                engineering practices, allowing us to deliver complete and dependable solutions
                to our clients.
              </p>
              <p>
                Quality, safety, and reliability are at the core of how we work. We follow
                structured processes, maintain disciplined execution, and build long-term
                relationships with clients across sugar, power, paper, chemical, food, and heavy
                engineering industries.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
            >
              {highlights.map((highlight) => {
                const Icon = highlight.icon
                return (
                  <div
                    key={highlight.title}
                    className="bg-white border border-gray-100 rounded-[20px] p-5 hover:-translate-y-1 hover:border-[#F4B400] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#F4B400]/10 flex items-center justify-center mb-3">
                      <Icon size={20} className="text-[#F4B400]" />
                    </div>
                    <h4 className="font-semibold text-[#0F172A]">{highlight.title}</h4>
                    <p className="text-sm text-[#334155] mt-1">{highlight.description}</p>
                  </div>
                )
              })}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 bg-white border-l-4 border-[#F4B400] rounded-r-[20px] rounded-l-md shadow-md p-6"
            >
              <p className="text-[#334155] italic leading-relaxed">
                &ldquo;Delivering dependable industrial solutions through engineering excellence,
                quality workmanship, and long-term partnerships.&rdquo;
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhoWeAre
