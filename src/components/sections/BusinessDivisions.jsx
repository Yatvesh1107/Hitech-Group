import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Thermometer, Scan, Settings, ArrowRight, Check } from "lucide-react"

const divisions = [
  {
    title: "Hitech Industrial Insulation",
    path: "/divisions/industrial-insulation",
    description:
      "Professional thermal and acoustic insulation solutions for industrial facilities.",
    features: ["Thermal Insulation", "Cold Insulation", "Acoustic Insulation"],
    icon: Thermometer,
    image:
      "/images/home/hitech-bd.png",
    alt: "Industrial insulation pipes and equipment",
  },
  {
    title: "Experts in Ultrasonics",
    path: "/divisions/experts-in-ultrasonics",
    description:
      "Industrial inspection and ultrasonic testing services for quality assurance.",
    features: ["Ultrasonic Testing", "NDT Inspection", "Material Evaluation"],
    icon: Scan,
    image:
      "/images/home/ultrasonic-bd.png",
    alt: "Ultrasonic testing and NDT inspection",
  },
  {
    title: "Precision Tech Engineering Services",
    path: "/divisions/precision-tech",
    description:
      "Engineering support and technical solutions for industrial infrastructure.",
    features: ["Engineering Services", "Industrial Projects", "Technical Consultancy"],
    icon: Settings,
    image:
      "/images/home/precision-bd.png",
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

function BusinessDivisions() {
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

      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-4 lg:py-10">
        <div className="text-center max-w-[700px] mx-auto mb-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
          >
            Business Divisions
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#0B2D5C] text-[34px] md:text-[42px] lg:text-[56px] font-extrabold leading-[1.1] mt-3"
          >
            One Group. Three Specialized Engineering Divisions.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#334155] text-lg leading-[1.7] mt-4"
          >
            HITECH GROUP operates through three distinct divisions, each bringing specialized
            expertise in industrial insulation, ultrasonic testing, and precision engineering to
            deliver comprehensive solutions across sectors.
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
                      to={division.path}
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-10"
        >
          <div className="w-16 h-[2px] bg-[#F4B400] mx-auto mb-4" />
          <p className="text-[#334155] text-lg font-medium">
            Integrated Industrial Solutions Under One Trusted Group
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default BusinessDivisions
