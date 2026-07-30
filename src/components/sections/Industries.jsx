import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  Factory,
  Bolt,
  FlaskConical,
  UtensilsCrossed,
  Pill,
  Cog,
  Layers,
  Wrench,
} from "lucide-react"

const industries = [
  {
    icon: Factory,
    title: "Sugar Industry",
    description:
      "Engineering, insulation and maintenance solutions for sugar manufacturing facilities.",
  },
  {
    icon: Bolt,
    title: "Power Generation",
    description:
      "Solutions supporting thermal plants and industrial power infrastructure.",
  },
  {
    icon: FlaskConical,
    title: "Chemical Processing",
    description:
      "Reliable insulation and engineering services for chemical plants.",
  },
  {
    icon: UtensilsCrossed,
    title: "Food Processing",
    description:
      "Industrial solutions designed for food production environments.",
  },
  {
    icon: Pill,
    title: "Pharmaceutical",
    description:
      "Supporting critical manufacturing facilities with precision engineering solutions.",
  },
  {
    icon: Cog,
    title: "Manufacturing",
    description:
      "Engineering services for modern manufacturing facilities.",
  },
  {
    icon: Layers,
    title: "Paper & Pulp",
    description:
      "Industrial support for paper mills and processing industries.",
  },
  {
    icon: Wrench,
    title: "Heavy Engineering",
    description:
      "Testing, inspection and engineering solutions for heavy industrial equipment.",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

function Industries() {
  return (
    <section className="bg-[#F8FAFC] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(11,45,92,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(11,45,92,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-8 lg:py-10">
        <div className="text-center max-w-[700px] mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
          >
            Industries We Serve
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#0B2D5C] text-[34px] md:text-[42px] lg:text-[56px] font-extrabold leading-[1.1] mt-3"
          >
            Delivering Engineering Solutions Across Diverse Industries
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#334155] text-lg leading-[1.7] mt-4"
          >
            HITECH GROUP delivers industrial insulation, inspection, testing, and engineering
            solutions across a wide range of industries, with a consistent focus on quality,
            efficiency, and operational reliability.
          </motion.p>
        </div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {industries.map((industry) => {
            const Icon = industry.icon
            return (
              <motion.div
                key={industry.title}
                variants={cardVariants}
                className="bg-white border border-gray-100 rounded-[22px] p-7 hover:-translate-y-1.5 hover:border-[#F4B400] hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#F4B400]/10 flex items-center justify-center mb-5">
                  <Icon size={28} className="text-[#F4B400]" />
                </div>
                <h4 className="text-lg font-bold text-[#0F172A]">{industry.title}</h4>
                <p className="text-sm text-[#334155] mt-3 leading-relaxed">
                  {industry.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <div className="bg-[#0B2D5C] rounded-[28px] px-8 md:px-16 py-12 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-[600px]">
              <h3 className="text-white text-2xl md:text-[30px] font-extrabold leading-[1.2]">
                Supporting Industries with Integrated Engineering Solutions
              </h3>
              <p className="text-[rgba(255,255,255,0.8)] mt-4 leading-relaxed max-w-[500px]">
                From sugar and power to pharmaceuticals and heavy engineering, HITECH GROUP brings
                specialized expertise to every sector we serve.
              </p>
            </div>
            <Link
              to="/contact"
              className="h-14 px-8 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl inline-flex items-center justify-center hover:bg-[#d9a000] transition-colors shrink-0"
            >
              Discuss Your Project
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Industries
