import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import thermal from "@/assets/images/home/thermal.png"
import chemical from "@/assets/images/home/chemical.png"
import food from "@/assets/images/home/food.png"

const projects = [
  {
    title: "Thermal Insulation for Power Plants",
    category: "Industrial Insulation",
    industry: "Power Generation",
    description:
      "Industrial insulation solutions designed to improve thermal efficiency and operational performance for power generation facilities.",
    image: thermal,
    alt: "Power plant thermal insulation",
  },
  {
    title: "Cryogenic Insulation for Chemical Facilities",
    category: "Industrial Insulation",
    industry: "Chemical Processing",
    description:
      "Cold insulation systems developed for temperature-sensitive industrial applications in chemical processing environments.",
    image: chemical,
    alt: "Chemical facility insulation",
  },
  {
    title: "Industrial Solutions for Food Processing",
    category: "Industrial Insulation",
    industry: "Food Processing",
    description:
      "Engineering and insulation services supporting efficient and hygienic food manufacturing operations.",
    image: food,
    alt: "Food processing facility",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

function ProjectsSection() {
  return (
    <section className="bg-[#F8FAFC] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #0B2D5C 1px, transparent 0)",
          backgroundSize: "50px 50px",
          opacity: 0.03,
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
            Featured Projects
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#0B2D5C] text-[34px] md:text-[42px] lg:text-[56px] font-extrabold leading-[1.1] mt-3"
          >
            Engineering Excellence Across Critical Industrial Projects
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#334155] text-lg leading-[1.7] mt-4"
          >
            HITECH GROUP has delivered engineering, insulation, and industrial solutions across
            multiple industries, helping clients optimize performance, safety, and operational
            efficiency.
          </motion.p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="group bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-lg hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-[240px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                <span className="absolute bottom-4 left-5 text-xs font-semibold text-white bg-[#F4B400]/90 px-3 py-1.5 rounded-md">
                  {project.industry}
                </span>
              </div>

              <div className="p-7">
                <span className="text-xs font-semibold text-[#F4B400] uppercase tracking-[1px]">
                  {project.category}
                </span>
                <h3 className="text-lg font-bold text-[#0B2D5C] mt-2 leading-snug">
                  {project.title}
                </h3>
                <p className="text-sm text-[#334155] mt-3 leading-relaxed">
                  {project.description}
                </p>

                <Link
                  to="/projects"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B2D5C] hover:text-[#F4B400] transition-colors"
                >
                  View Project <ArrowUpRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
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
                Every Project is Built Around Quality, Safety &amp; Performance
              </h3>
              <p className="text-[rgba(255,255,255,0.8)] mt-4 leading-relaxed">
                From planning to execution, every project reflects our commitment to engineering
                excellence and client satisfaction.
              </p>
            </div>
            <Link
              to="/contact"
              className="h-14 px-8 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl inline-flex items-center justify-center hover:bg-[#d9a000] transition-colors shrink-0"
            >
              Start Your Project
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection
