import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Thermometer, Scan, Settings, Check, ArrowRight } from "lucide-react"

const services = [
  {
    title: "Industrial Insulation",
    accent: "blue",
    icon: Thermometer,
    items: [
      "Thermal Insulation",
      "Cold Insulation",
      "Acoustic Insulation",
      "Sound Proofing",
      "Roofing Insulation",
      "Vibration Insulation",
    ],
  },
  {
    title: "Altron Testing & Allieds",
    accent: "yellow",
    icon: Scan,
    items: [
      "Ultrasonic Testing",
      "Dye Penetration Testing",
      "Thickness Testing",
      "Magnetic Particle Testing",
    ],
  },
  {
    title: "Precision Tech Engineering",
    accent: "teal",
    icon: Settings,
    items: [
      "Dynamic Balancing",
      "Vibratory Stress Relieving",
      "Jet Cleaning",
      "Ultrasonic Testing Services",
    ],
  },
]

const accentMap = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    border: "hover:border-blue-500",
  },
  yellow: {
    bg: "bg-[#F4B400]/10",
    icon: "text-[#F4B400]",
    border: "hover:border-[#F4B400]",
  },
  teal: {
    bg: "bg-teal-50",
    icon: "text-teal-600",
    border: "hover:border-teal-500",
  },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

function ServicesSection() {
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

      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-8 lg:py-10">
        <div className="text-center max-w-[700px] mx-auto mb-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
          >
            Our Services
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#0B2D5C] text-[34px] md:text-[42px] lg:text-[56px] font-extrabold leading-[1.1] mt-3"
          >
            Comprehensive Industrial Solutions Under One Group
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#334155] text-lg leading-[1.7] mt-4"
          >
            HITECH GROUP delivers integrated industrial solutions through three specialized
            business divisions, combining deep technical expertise with a commitment to quality
            and operational excellence.
          </motion.p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service) => {
            const Icon = service.icon
            const colors = accentMap[service.accent]

            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className={`group bg-white border border-gray-100 rounded-[24px] p-7 shadow-md ${colors.border} hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center mb-6`}
                >
                  <Icon size={32} className={colors.icon} />
                </div>

                <h3 className="text-xl font-bold text-[#0B2D5C]">{service.title}</h3>

                <div className="mt-5 space-y-3 flex-1">
                  {service.items.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-[#334155]">
                      <Check size={16} className="text-[#F4B400] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-gray-100">
                  <Link
                    to="/divisions"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B2D5C] hover:text-[#F4B400] transition-colors"
                  >
                    Learn More <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10"
        >
          <div className="bg-[#0B2D5C] rounded-[28px] px-8 md:px-16 py-12 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-[600px]">
              <h3 className="text-white text-2xl md:text-[30px] font-extrabold leading-[1.2]">
                Need a Customized Engineering Solution?
              </h3>
              <p className="text-[rgba(255,255,255,0.8)] mt-4 leading-relaxed">
                Talk to our team and discover how HITECH GROUP can support your next industrial
                project.
              </p>
            </div>
            <Link
              to="/contact"
              className="h-14 px-8 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl inline-flex items-center justify-center hover:bg-[#d9a000] transition-colors shrink-0"
            >
              Talk to Our Experts
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
