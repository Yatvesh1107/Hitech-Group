import { Fragment } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Flame,
  ScanSearch,
  Settings,
  ArrowRight,
  ArrowUpRight,
  Cog,
  BadgeCheck,
  Users,
  Award,
  Layers,
  Factory,
  Check,
  Search,
  Network,
  PackageCheck,
  ArrowDown,
} from "lucide-react"

const divisions = [
  {
    icon: Flame,
    title: "Industrial Insulation",
    subtitle: "Thermal, cold and acoustic insulation solutions",
  },
  {
    icon: ScanSearch,
    title: "Experts in Ultrasonics",
    subtitle: "Non-destructive testing and inspection services",
  },
  {
    icon: Settings,
    title: "Precision Tech Engineering",
    subtitle: "Precision engineering and technical services",
  },
]

const bottomStrip = [
  { icon: Cog, label: "Industrial Expertise" },
  { icon: BadgeCheck, label: "Quality" },
  { icon: ScanSearch, label: "Inspection" },
  { icon: Settings, label: "Engineering" },
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

function Divisions() {
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

        <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8 min-h-[70vh] flex flex-col justify-center pt-[40px] pb-[140px]">
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
                Business Divisions
              </motion.span>

              <motion.h1
                variants={itemVariants}
                className="text-white text-[38px] leading-[1.1] lg:text-[60px] lg:leading-[1.05] font-extrabold max-w-[680px] mt-3 mx-auto lg:mx-0"
              >
                Three Specialized Companies. One Engineering Vision.
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-[rgba(255,255,255,0.85)] text-lg lg:text-xl leading-[1.7] max-w-[560px] mt-5 mx-auto lg:mx-0"
              >
                HITECH GROUP is a unified engineering organization delivering industrial
                insulation, inspection and engineering solutions through three specialized
                companies — each focused on its own discipline, all working to the same
                standards.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 mt-9 justify-center lg:justify-start"
              >
                <Link
                  to="/divisions"
                  className="h-14 px-8 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl inline-flex items-center justify-center hover:bg-[#d9a000] transition-colors"
                >
                  Explore Divisions
                </Link>
                <Link
                  to="/contact"
                  className="h-14 px-8 border-2 border-white text-white font-semibold rounded-xl inline-flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>

            <motion.div variants={cardVariants} className="max-lg:mt-8">
              <div className="bg-white/90 backdrop-blur-md rounded-[24px] shadow-2xl p-8 max-w-[480px] mx-auto lg:mx-0 lg:ml-auto">
                <h3 className="text-lg font-bold text-[#0B2D5C] mb-6">Our Divisions</h3>
                <div className="space-y-3">
                  {divisions.map((division) => {
                    const Icon = division.icon
                    return (
                      <Link
                        key={division.title}
                        to="/divisions"
                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#F4B400]/10 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#F4B400]/10 flex items-center justify-center shrink-0">
                          <Icon size={20} className="text-[#F4B400]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-[#0F172A]">{division.title}</h4>
                          <p className="text-sm text-[#334155]">{division.subtitle}</p>
                        </div>
                        <ArrowUpRight size={18} className="text-[#F4B400] shrink-0" />
                      </Link>
                    )
                  })}
                </div>
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

      <section className="bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-8 lg:py-10">
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
                    src="/images/home/home-about-main.png"
                    alt="HITECH GROUP specialized engineering operations"
                    className="w-full h-[420px] md:h-[500px] object-cover"
                  />
                </div>

                <div className="absolute -top-4 -right-4 rounded-[20px] overflow-hidden shadow-lg w-[160px] md:w-[200px]">
                  <img
                    src="/images/home/home-about-small.png"
                    alt="Engineering detail"
                    className="w-full h-[110px] md:h-[140px] object-cover"
                  />
                </div>

                <div className="absolute -bottom-6 -left-4 md:left-0 bg-white rounded-[20px] shadow-2xl p-5 max-w-[280px]">
                  <h4 className="font-bold text-[#0B2D5C] text-sm">
                    Specialized. Focused. Integrated.
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {[
                      "One shared engineering standard",
                      "Three dedicated disciplines",
                      "End-to-end industrial support",
                    ].map((point) => (
                      <li key={point} className="flex items-center gap-2 text-xs text-[#334155]">
                        <Check size={14} className="text-[#F4B400] shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
                Introduction
              </motion.span>

              <motion.h2
                variants={itemVariants}
                className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
              >
                Why Specialized Engineering Matters
              </motion.h2>

              <motion.div
                variants={itemVariants}
                className="mt-6 space-y-4 text-[#334155] leading-[1.8]"
              >
                <p>
                  HITECH GROUP operates through three specialized companies because true
                  industrial reliability demands depth — not just breadth. Each division focuses
                  exclusively on its own discipline, building the equipment, methods and
                  experience required to deliver work of a consistently high standard.
                </p>
                <p>
                  Yet no single discipline works in isolation. Insulation protects, inspection
                  verifies, and engineering restores. When these capabilities operate under one
                  group, every division complements the others — giving clients complete,
                  coordinated support from a single trusted partner.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
              >
                {[
                  {
                    icon: Layers,
                    title: "Complete Solutions",
                    description: "Multiple disciplines coordinated under one accountable group.",
                  },
                  {
                    icon: Cog,
                    title: "Technical Expertise",
                    description: "Deep, dedicated capability within each specialized division.",
                  },
                  {
                    icon: Factory,
                    title: "Industry Experience",
                    description: "Proven delivery across demanding industrial environments.",
                  },
                  {
                    icon: BadgeCheck,
                    title: "Quality Assurance",
                    description: "Shared standards applied across every engagement.",
                  },
                ].map((feature) => {
                  const Icon = feature.icon
                  return (
                    <div
                      key={feature.title}
                      className="bg-white border border-gray-100 rounded-[20px] p-5 hover:-translate-y-1 hover:border-[#F4B400] transition-all duration-300"
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
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-8 lg:py-10">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              {
                title: "Hitech Industrial Insulation",
                description:
                  "Professional insulation contracting for industrial facilities — protecting processes, equipment and personnel.",
                image: "/images/home/hitech-bd.png",
                alt: "Industrial insulation pipes and equipment",
                icon: Flame,
                services: ["Thermal", "Cold", "Acoustic", "Roofing"],
              },
              {
                title: "Experts in Ultrasonics",
                description:
                  "Non-destructive testing and ultrasonic inspection services that verify material integrity and operational safety.",
                image: "/images/home/ultrasonic-bd.png",
                alt: "Ultrasonic testing and NDT inspection",
                icon: ScanSearch,
                services: ["UT", "DPT", "MPT", "Thickness Testing"],
              },
              {
                title: "Precision Tech Engineering",
                description:
                  "Precision engineering and technical services that restore and sustain the performance of industrial machinery.",
                image: "/images/home/precision-bd.png",
                alt: "Industrial engineering and machinery",
                icon: Settings,
                services: ["Dynamic Balancing", "VSR", "Jet Cleaning", "Engineering"],
              },
            ].map((division) => {
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
                    <div className="absolute bottom-4 left-6 w-10 h-10 rounded-lg bg-white/95 flex items-center justify-center shadow-md">
                      <Icon size={20} className="text-[#F4B400]" />
                    </div>
                  </div>

                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-[#0B2D5C]">{division.title}</h3>
                    <p className="text-[#334155] mt-3 leading-relaxed">{division.description}</p>

                    <div className="mt-5">
                      <h4 className="text-xs font-bold text-[#0B2D5C] tracking-wider uppercase mb-3">
                        Key Services
                      </h4>
                      <div className="space-y-2.5">
                        {division.services.map((service) => (
                          <div
                            key={service}
                            className="flex items-center gap-2.5 text-sm text-[#334155]"
                          >
                            <Check size={16} className="text-[#F4B400] shrink-0" />
                            <span>{service}</span>
                          </div>
                        ))}
                      </div>
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
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-8 lg:py-10">
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
              Our Process
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
            >
              From Need to Complete Solution
            </motion.h2>

            <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
              A simple, structured approach that connects every industrial challenge with the
              right specialized capability — under one accountable engineering group.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center mt-8">
            <motion.div
              className="relative"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="hidden lg:block absolute left-[31px] top-8 bottom-8 w-px bg-[#E2E8F0]" />

              {[
                {
                  icon: Search,
                  title: "Identify Industrial Need",
                  description:
                    "Every engagement begins with a clear understanding of the client's operational challenge, site conditions and technical requirements.",
                },
                {
                  icon: Network,
                  title: "Assign Specialized Division",
                  description:
                    "The right specialist company within the group is assigned — insulation, inspection or engineering — ensuring focused, expert execution.",
                },
                {
                  icon: PackageCheck,
                  title: "Deliver Complete Engineering Solution",
                  description:
                    "The division delivers a complete, dependable solution — coordinated under one group, one standard and one point of accountability.",
                },
              ].map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={step.title}>
                    <motion.div
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
                        <h3 className="font-bold text-[#0B2D5C] text-lg mt-1">{step.title}</h3>
                        <p className="text-sm text-[#334155] leading-[1.7] mt-1.5">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>

                    {index < 2 && (
                      <div className="flex justify-center my-4">
                        <ArrowDown size={20} className="text-[#F4B400]" />
                      </div>
                    )}
                  </div>
                )
              })}
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
                    alt="HITECH GROUP structured engineering process"
                    className="w-full h-[420px] md:h-[540px] object-cover"
                  />
                </div>

                <div className="absolute -top-4 -right-4 rounded-[20px] overflow-hidden shadow-lg w-[150px] md:w-[180px]">
                  <img
                    src="/images/home/home-about-small.png"
                    alt="Engineering detail"
                    className="w-full h-[100px] md:h-[120px] object-cover"
                  />
                </div>

                <div className="absolute -bottom-6 -left-4 md:left-6 bg-white rounded-[20px] shadow-2xl p-5 max-w-[250px]">
                  <h4 className="font-bold text-[#0B2D5C] text-sm">One Group. One Standard.</h4>
                  <ul className="mt-3 space-y-2">
                    {[
                      "Structured, disciplined execution",
                      "Shared quality across all divisions",
                      "Accountable end-to-end delivery",
                    ].map((point) => (
                      <li key={point} className="flex items-center gap-2 text-xs text-[#334155]">
                        <Check size={14} className="text-[#F4B400] shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-8 lg:py-10">
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
              Collaboration
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
            >
              Three Companies. One Seamless Workflow.
            </motion.h2>

            <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
              HITECH GROUP&rsquo;s divisions work in sequence and in partnership — each building
              on the other to deliver complete, coordinated industrial solutions.
            </motion.p>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 mt-8">
            {[
              {
                icon: Flame,
                title: "Industrial Insulation",
                description:
                  "The workflow begins with insulation — protecting processes, equipment and personnel from heat, cold and noise.",
              },
              {
                icon: ScanSearch,
                title: "Experts in Ultrasonics",
                description:
                  "Inspection then verifies the quality and integrity of insulated and operational systems with reliable non-destructive testing.",
              },
              {
                icon: Settings,
                title: "Precision Engineering",
                description:
                  "Precision engineering follows — restoring performance and keeping machinery balanced, stress-relieved and ready to run.",
              },
              {
                icon: Layers,
                title: "Integrated Solution",
                description:
                  "The result is a complete, integrated solution delivered by one group with a single standard and shared accountability.",
              },
            ].map((step, index) => {
              const Icon = step.icon
              const isLast = index === 3
              return (
                <Fragment key={step.title}>
                  {index > 0 && (
                    <>
                      <div className="flex justify-center lg:hidden my-1">
                        <motion.div
                          initial={{ opacity: 0, scaleY: 0 }}
                          whileInView={{ opacity: 1, scaleY: 1 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.4 }}
                          className="h-8 w-px bg-gradient-to-b from-[#F4B400] to-[#F4B400]/40 origin-top"
                        />
                        <ArrowDown size={20} className="text-[#F4B400] -ml-2.5 mt-4" />
                      </div>

                      <div className="hidden lg:flex items-center justify-center flex-1">
                        <motion.div
                          initial={{ opacity: 0, scaleX: 0 }}
                          whileInView={{ opacity: 1, scaleX: 1 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="w-full h-px bg-gradient-to-r from-[#F4B400]/30 via-[#F4B400] to-[#F4B400]/30 origin-left"
                        />
                        <ArrowRight size={20} className="text-[#F4B400] -ml-4" />
                      </div>
                    </>
                  )}

                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className={`flex-1 bg-white rounded-[24px] border border-gray-100 shadow-sm p-7 text-center hover:-translate-y-1 hover:shadow-xl hover:border-[#F4B400] transition-all duration-300 ${
                      isLast ? "bg-[#0B2D5C] border-[#0B2D5C]" : ""
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-xl mx-auto flex items-center justify-center ${
                        isLast ? "bg-white/10" : "bg-[#F4B400]/10"
                      }`}
                    >
                      <Icon size={26} className="text-[#F4B400]" />
                    </div>
                    <h3
                      className={`font-bold text-lg mt-4 ${isLast ? "text-white" : "text-[#0B2D5C]"}`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm leading-[1.7] mt-2 ${
                        isLast ? "text-[rgba(255,255,255,0.8)]" : "text-[#334155]"
                      }`}
                    >
                      {step.description}
                    </p>
                  </motion.div>
                </Fragment>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Divisions
