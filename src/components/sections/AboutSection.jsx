import { motion } from "framer-motion"
import { Award, BadgeCheck, Users, Target, Check } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Engineering Excellence",
    description: "Delivering precision-driven engineering solutions across diverse industrial sectors.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Assurance",
    description: "Rigorous quality control and compliance with industry standards and regulations.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    description: "Skilled professionals with deep domain expertise and technical knowledge.",
  },
  {
    icon: Target,
    title: "Customer Focus",
    description: "Tailored solutions built around each client's unique operational requirements.",
  },
]

const partnerHighlights = [
  "Engineering Solutions",
  "Reliable Service",
  "Industry Expertise",
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

function AboutSection() {
  return (
    <section className="bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #0B2D5C 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.04,
        }}
      />

      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-[120px]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-[80px] items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="rounded-[24px] overflow-hidden">
                <img
                  src="/images/home/home-about-main.png"
                  alt="HITECH industrial facility"
                  className="w-full h-[420px] md:h-[500px] object-cover"
                />
              </div>

              <div className="absolute -top-4 -right-4 rounded-[20px] overflow-hidden shadow-lg w-[160px] md:w-[200px]">
                <img
                  src="/images/home/home-about-small.png"
                  alt="Engineering operations"
                  className="w-full h-[110px] md:h-[140px] object-cover"
                />
              </div>

              <div className="absolute -bottom-6 left-8 w-16 h-[3px] bg-[#F4B400] rounded-full" />
            </div>
          </motion.div>

          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-4">
              <motion.span
                variants={itemVariants}
                className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
              >
                About Hitech
              </motion.span>

              <motion.h2
                variants={itemVariants}
                className="text-[#0B2D5C] text-[34px] md:text-[40px] lg:text-[52px] font-extrabold leading-[1.1]"
              >
                Delivering Industrial Engineering Solutions with Quality, Innovation &amp; Reliability
              </motion.h2>
            </div>

            <motion.div variants={itemVariants} className="space-y-4 text-[#334155] leading-[1.8]">
              <p>
                HITECH GROUP is a multi-disciplinary industrial engineering group delivering
                specialized solutions across insulation, non-destructive testing, and precision
                engineering. With a strong operational presence in Kolhapur, Maharashtra, the group
                serves a diverse range of industries including manufacturing, energy, infrastructure,
                and process industries.
              </p>
              <p>
                Each division operates with its own technical expertise, allowing HITECH to offer
                deep specialization while leveraging shared resources, quality standards, and
                engineering best practices across the organization.
              </p>
              <p>
                The group is built on a foundation of technical competence, operational integrity,
                and a commitment to delivering measurable value. By combining domain expertise with
                a client-first approach, HITECH has established long-term partnerships across the
                industrial sector.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className="bg-white border border-gray-100 rounded-[18px] p-5 hover:-translate-y-1 hover:border-[#F4B400] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#F4B400]/10 flex items-center justify-center mb-3">
                      <Icon size={20} className="text-[#F4B400]" />
                    </div>
                    <h4 className="font-semibold text-[#0F172A]">{feature.title}</h4>
                    <p className="text-sm text-[#334155] mt-1">{feature.description}</p>
                  </div>
                )
              })}
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <a
                  href="/about"
                  className="h-14 px-8 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl inline-flex items-center justify-center hover:bg-[#d9a000] transition-colors"
                >
                  Learn More
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white border border-gray-100 rounded-2xl shadow-md p-6"
            >
              <h4 className="font-bold text-[#0B2D5C]">Trusted Industrial Partner</h4>
              <p className="text-sm text-[#334155] mt-2 leading-relaxed">
                HITECH GROUP is committed to being a reliable partner for industrial engineering
                needs, combining technical expertise with a commitment to quality and timely
                delivery.
              </p>
              <div className="mt-4 space-y-2">
                {partnerHighlights.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-[#334155]">
                    <Check size={16} className="text-[#F4B400] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
