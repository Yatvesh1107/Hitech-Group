import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Flame, ScanSearch, Settings, ArrowRight, Check } from "lucide-react"

const divisions = [
  {
    title: "Hitech Industrial Insulation",
    description:
      "Specialized insulation contracting delivering reliable thermal, cold and acoustic protection for industrial facilities.",
    features: [
      "Thermal Insulation",
      "Cold Insulation",
      "Acoustic Insulation",
      "Roofing Solutions",
    ],
    icon: Flame,
    image: "/images/home/hitech-bd.png",
    alt: "Industrial insulation pipes and equipment",
  },
  {
    title: "Experts in Ultrasonics",
    description:
      "Advanced non-destructive testing and ultrasonic inspection services that verify material integrity and safety.",
    features: [
      "Ultrasonic Testing",
      "Dye Penetrant Testing",
      "Magnetic Particle Testing",
      "Thickness Testing",
    ],
    icon: ScanSearch,
    image: "/images/home/ultrasonic-bd.png",
    alt: "Ultrasonic testing and NDT inspection",
  },
  {
    title: "Precision Tech Engineering Services",
    description:
      "Precision engineering support and technical services that keep industrial machinery running reliably.",
    features: [
      "Dynamic Balancing",
      "Vibratory Stress Relieving",
      "Jet Cleaning",
      "Engineering Services",
    ],
    icon: Settings,
    image: "/images/home/precision-bd.png",
    alt: "Industrial engineering and machinery",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

function GroupCompanies() {
  return (
    <section className="bg-white relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-8 lg:py-10">
        <div className="text-center max-w-[700px] mx-auto mb-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
          >
            Our Group Companies
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
          >
            Three Specialized Companies. One Trusted Engineering Group.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#334155] leading-[1.8] mt-4"
          >
            HITECH GROUP combines expertise in industrial insulation, non-destructive testing
            and engineering services to deliver comprehensive industrial solutions.
          </motion.p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {divisions.map((division) => {
            const Icon = division.icon
            return (
              <motion.div
                key={division.title}
                variants={cardVariants}
                className="group bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-lg hover:-translate-y-2 hover:border-[#F4B400] hover:shadow-2xl transition-all duration-400 flex flex-col"
              >
                <div className="relative h-[240px] overflow-hidden">
                  <img
                    src={division.image}
                    alt={division.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <div className="w-10 h-10 rounded-lg bg-[#F4B400]/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-[#F4B400]" />
                  </div>

                  <h3 className="text-xl font-bold text-[#0B2D5C]">{division.title}</h3>
                  <p className="text-[#334155] mt-3 leading-relaxed">{division.description}</p>

                  <div className="mt-5 space-y-2.5">
                    {division.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2.5 text-sm text-[#334155]">
                        <Check size={16} className="text-[#F4B400] shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="border-t border-gray-100 mb-6" />

                    <Link
                      to="/divisions"
                      className="inline-flex items-center gap-2 h-12 px-6 border-2 border-[#0B2D5C] text-[#0B2D5C] font-semibold rounded-xl hover:bg-[#F4B400] hover:border-[#F4B400] hover:text-[#0F172A] transition-all duration-300"
                    >
                      Explore Division
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#0B2D5C] rounded-[28px] mt-10 px-8 py-14 text-center"
        >
          <h3 className="text-white text-2xl md:text-3xl font-extrabold leading-[1.2]">
            Integrated Industrial Solutions Under One Trusted Group
          </h3>
          <p className="text-[rgba(255,255,255,0.8)] leading-[1.8] mt-4 max-w-[760px] mx-auto">
            Our three divisions work together to provide end-to-end industrial solutions across
            multiple industries — from insulation and testing to precision engineering — under
            shared quality standards and a single point of accountability.
          </p>
          <Link
            to="/divisions"
            className="inline-flex items-center gap-2 h-14 px-9 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl hover:bg-[#d9a000] transition-colors mt-8"
          >
            Explore All Divisions
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default GroupCompanies
