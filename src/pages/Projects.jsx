import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  MapPin,
  Calendar,
  ClipboardList,
  Search,
  Wrench,
  Handshake,
  BadgeCheck,
  Factory,
  Users,
  Globe,
} from "lucide-react"

const projects = [
  {
    title: "Thermal Insulation for Power Plant",
    category: "Industrial Insulation",
    industry: "Power Generation",
    location: "Maharashtra, India",
    year: "2025",
    status: "Completed",
    description:
      "Comprehensive thermal insulation for piping, boilers and process equipment, reducing heat loss and improving overall plant efficiency.",
    image: "/images/home/hitech-bd.png",
    alt: "Thermal insulation for power plant",
  },
  {
    title: "Cold Insulation for Chemical Facility",
    category: "Industrial Insulation",
    industry: "Chemical Processing",
    location: "Gujarat, India",
    year: "2024",
    status: "Completed",
    description:
      "Cryogenic and cold insulation systems for low-temperature process lines and storage, protecting sensitive chemical operations.",
    image: "/images/home/home-about-main.png",
    alt: "Cold insulation for chemical facility",
  },
  {
    title: "Acoustic Insulation for Food Processing Unit",
    category: "Industrial Insulation",
    industry: "Food Processing",
    location: "Karnataka, India",
    year: "2024",
    status: "Completed",
    description:
      "Acoustic and thermal insulation solutions supporting quieter, more hygienic and energy-efficient food manufacturing operations.",
    image: "/images/home/home-about-small.png",
    alt: "Acoustic insulation for food processing unit",
  },
  {
    title: "Ultrasonic Testing of Pressure Vessels",
    category: "Experts in Ultrasonics",
    industry: "Heavy Engineering",
    location: "Maharashtra, India",
    year: "2025",
    status: "Completed",
    description:
      "Advanced ultrasonic testing and thickness measurement of pressure vessels and critical equipment, ensuring structural integrity and safety.",
    image: "/images/home/ultrasonic-bd.png",
    alt: "Ultrasonic testing of pressure vessels",
  },
  {
    title: "NDT Inspection for Sugar Mill Equipment",
    category: "Experts in Ultrasonics",
    industry: "Sugar Industry",
    location: "Karnataka, India",
    year: "2024",
    status: "Completed",
    description:
      "Non-destructive testing of shafts, rolls and process equipment for a sugar mill, detecting early defects and extending equipment life.",
    image: "/images/home/hero-bg.png",
    alt: "NDT inspection for sugar mill equipment",
  },
  {
    title: "Dynamic Balancing of Industrial Rotors",
    category: "Precision Tech Engineering",
    industry: "Manufacturing",
    location: "Maharashtra, India",
    year: "2025",
    status: "Completed",
    description:
      "Precision dynamic balancing of industrial rotors and fan assemblies, reducing vibration and improving equipment reliability.",
    image: "/images/home/precision-bd.png",
    alt: "Dynamic balancing of industrial rotors",
  },
]

const processSteps = [
  {
    icon: ClipboardList,
    title: "Understand the Requirement",
    description:
      "We begin by understanding your equipment, process and performance requirements in detail.",
  },
  {
    icon: Search,
    title: "Plan the Right Solution",
    description:
      "Our engineers develop a tailored approach using the right materials, methods and expertise.",
  },
  {
    icon: Wrench,
    title: "Execute with Precision",
    description:
      "Trained teams deliver the work on site, following strict quality and safety standards.",
  },
  {
    icon: Handshake,
    title: "Support Beyond Delivery",
    description:
      "We follow up after completion to ensure long-term performance and reliability.",
  },
]

const heroStats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "12+", label: "Industries Served" },
  { value: "50+", label: "Active Clients" },
  { value: "ISO", label: "9001:2015 Certified" },
]

const bottomStrip = [
  { icon: Factory, label: "Industrial Projects" },
  { icon: BadgeCheck, label: "Quality Driven" },
  { icon: Users, label: "Expert Execution" },
  { icon: Globe, label: "Pan-India Presence" },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const cardVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.3, ease: "easeOut" } },
}

const gridContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const gridCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

function Projects() {
  return (
    <>
      <section className="relative bg-[#082A57] overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/about/hero-bg.png')",
            }}
          />
          <div className="absolute inset-0 bg-[rgba(8,42,87,0.7)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8 min-h-[70vh] flex flex-col justify-center pt-[80px] pb-[140px]">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="text-center lg:text-left">
              <motion.span
                variants={itemVariants}
                className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
              >
                Our Projects
              </motion.span>

              <motion.h1
                variants={itemVariants}
                className="text-white text-[38px] leading-[1.1] lg:text-[60px] lg:leading-[1.05] font-extrabold max-w-[680px] mt-3 mx-auto lg:mx-0"
              >
                Engineering Solutions in Action
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-[rgba(255,255,255,0.85)] text-lg lg:text-xl leading-[1.7] max-w-[560px] mt-5 mx-auto lg:mx-0"
              >
                HITECH GROUP delivers insulation, non-destructive testing, and precision
                engineering projects across a wide range of industries — each one executed with
                quality, safety and performance at its core.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 mt-9 justify-center lg:justify-start"
              >
                <Link
                  to="/divisions"
                  className="h-14 px-8 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl inline-flex items-center justify-center hover:bg-[#d9a000] transition-colors"
                >
                  Explore Our Divisions
                </Link>
                <Link
                  to="/contact"
                  className="h-14 px-8 border-2 border-white text-white font-semibold rounded-xl inline-flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  Start a Project
                </Link>
              </motion.div>
            </div>

            <motion.div variants={cardVariants} className="max-lg:mt-8">
              <div className="bg-white/90 backdrop-blur-md rounded-[24px] shadow-2xl p-8 max-w-[480px] mx-auto lg:mx-0 lg:ml-auto">
                <h3 className="text-lg font-bold text-[#0B2D5C] mb-6">Project Track Record</h3>
                <div className="grid grid-cols-2 gap-5">
                  {heroStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-[#F8FAFC] border border-gray-100 rounded-[16px] p-4 text-center"
                    >
                      <div className="text-2xl font-extrabold text-[#0B2D5C]">{stat.value}</div>
                      <div className="text-xs text-[#334155] mt-1 leading-snug">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#334155] leading-relaxed mt-5">
                  From single-equipment interventions to complete industrial programs, we have
                  consistently delivered dependable, engineering-driven results.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-6 py-5">
              {bottomStrip.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center gap-3 text-white/80">
                    <Icon size={18} className="text-[#F4B400] shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #0B2D5C 1px, transparent 0)",
            backgroundSize: "50px 50px",
            opacity: 0.03,
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
              Featured Projects
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[#0B2D5C] text-[34px] md:text-[42px] lg:text-[56px] font-extrabold leading-[1.1] mt-3"
            >
              Delivering Dependable Results Across Industries
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#334155] text-lg leading-[1.7] mt-4"
            >
              A selection of projects delivered by HITECH GROUP across insulation, non-destructive
              testing, and precision engineering — reflecting our commitment to quality, safety and
              long-term performance.
            </motion.p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={gridCardVariants}
                className="group bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-lg hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-[220px] overflow-hidden">
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
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-[#F4B400] uppercase tracking-[1px]">
                      {project.category}
                    </span>
                    <span className="text-[11px] text-[#94A3B8]">{project.status}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0B2D5C] mt-2 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[#334155] mt-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-4 mt-4 text-xs text-[#94A3B8]">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={13} className="text-[#0B2D5C]" />
                      {project.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#0B2D5C]" />
                      {project.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
          <div className="text-center max-w-[700px] mx-auto mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
            >
              Our Approach
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[#0B2D5C] text-[34px] md:text-[42px] lg:text-[56px] font-extrabold leading-[1.1] mt-3"
            >
              From Need to Complete Solution
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#334155] text-lg leading-[1.7] mt-4"
            >
              Every project follows a proven process — from understanding your requirement to
              delivering a reliable, long-lasting solution.
            </motion.p>
          </div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {processSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  variants={gridCardVariants}
                  className="relative bg-white border border-gray-100 rounded-[22px] p-7 hover:-translate-y-1.5 hover:border-[#F4B400] hover:shadow-xl transition-all duration-300"
                >
                  <span className="absolute top-6 right-6 text-[40px] font-extrabold text-[#0B2D5C]/5">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="w-14 h-14 rounded-xl bg-[#F4B400]/10 flex items-center justify-center mb-5">
                    <Icon size={28} className="text-[#F4B400]" />
                  </div>
                  <h4 className="text-lg font-bold text-[#0F172A]">{step.title}</h4>
                  <p className="text-sm text-[#334155] mt-3 leading-relaxed">
                    {step.description}
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
                  Every Project is Built Around Quality, Safety &amp; Performance
                </h3>
                <p className="text-[rgba(255,255,255,0.8)] mt-4 leading-relaxed">
                  Have a project in mind? Share your requirement and our engineering team will help
                  you plan the right solution.
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
    </>
  )
}

export default Projects
