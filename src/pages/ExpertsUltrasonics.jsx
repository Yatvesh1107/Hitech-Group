import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ScanSearch,
  Droplets,
  Magnet,
  Ruler,
  BadgeCheck,
  ShieldCheck,
  HardHat,
  Check,
  Target,
  ArrowRight,
  Bolt,
  Fuel,
  FlaskConical,
  Cog,
  Wrench,
  Hammer,
  Search,
} from "lucide-react"

const expertise = [
  {
    icon: ScanSearch,
    title: "Ultrasonic Testing (UT)",
    description: "Detecting internal flaws using high-frequency sound waves.",
  },
  {
    icon: Droplets,
    title: "Dye Penetrant Testing (DPT)",
    description: "Revealing surface-breaking defects on materials.",
  },
  {
    icon: Magnet,
    title: "Magnetic Particle Testing (MPT)",
    description: "Locating surface and near-surface discontinuities in ferrous parts.",
  },
  {
    icon: Ruler,
    title: "Thickness Measurement",
    description: "Verifying remaining wall thickness of pipes and vessels.",
  },
]

const bottomStrip = [
  { icon: ScanSearch, label: "Accurate Inspection" },
  { icon: BadgeCheck, label: "Quality Assurance" },
  { icon: ShieldCheck, label: "Reliable Testing" },
  { icon: HardHat, label: "Industrial Safety" },
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

function ExpertsUltrasonics() {
  return (
    <>
      <section className="relative bg-[#082A57] overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/ultrasonics/hero.png')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(8,42,87,0.92)] via-[rgba(8,42,87,0.75)] to-[rgba(8,42,87,0.6)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8 min-h-[calc(100svh-124px)] flex flex-col justify-center pt-10 pb-20">
        <motion.div
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center lg:text-left">
            <motion.span
              variants={itemVariants}
              className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
            >
              Experts in Ultrasonics
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-white text-[38px] leading-[1.1] lg:text-[60px] lg:leading-[1.05] font-extrabold max-w-[680px] mt-3 mx-auto lg:mx-0"
            >
              Precision Non-Destructive Testing Solutions
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-[rgba(255,255,255,0.85)] text-lg lg:text-xl leading-[1.7] max-w-[560px] mt-4 mx-auto lg:mx-0"
            >
              Experts in Ultrasonics is HITECH GROUP&rsquo;s specialized non-destructive testing
              division. We provide advanced inspection and testing solutions that evaluate
              material integrity without causing damage — helping industries maintain quality,
              safety and reliability across their operations.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start"
            >
              <Link
                to="/divisions/experts-in-ultrasonics"
                className="h-14 px-8 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl inline-flex items-center justify-center hover:bg-[#d9a000] transition-colors"
              >
                Explore Services
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
              <h3 className="text-lg font-bold text-[#0B2D5C] mb-6">Testing Expertise</h3>
              <div className="space-y-5">
                {expertise.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#F4B400]/10 flex items-center justify-center shrink-0">
                        <Icon size={20} className="text-[#F4B400]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#0F172A]">{item.title}</h4>
                        <p className="text-sm text-[#334155] mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2.5 gap-x-5 py-4">
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
                  src="/images/ultrasonics/ultra-about.png"
                  alt="Ultrasonic testing operations"
                  className="w-full h-[420px] md:h-[500px] object-cover"
                />
              </div>

              <div className="absolute -top-4 -right-4 rounded-[20px] overflow-hidden shadow-lg w-[160px] md:w-[200px]">
                <img
                  src="/images/home/home-about-small.png"
                  alt="Inspection detail"
                  className="w-full h-[110px] md:h-[140px] object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-4 md:left-0 bg-white rounded-[20px] shadow-2xl p-5 max-w-[280px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F4B400]/10 flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} className="text-[#F4B400]" />
                  </div>
                  <h4 className="font-bold text-[#0B2D5C] text-sm">
                    Non-Destructive Testing. Precision Inspection.
                  </h4>
                </div>
                <ul className="mt-3 space-y-2">
                  {["Material integrity without damage", "Consistent, reliable results"].map(
                    (point) => (
                      <li key={point} className="flex items-center gap-2 text-xs text-[#334155]">
                        <Check size={14} className="text-[#F4B400] shrink-0" />
                        <span>{point}</span>
                      </li>
                    )
                  )}
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
              About the Division
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
            >
              Advanced Inspection Solutions Without Compromising Material Integrity
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="mt-6 space-y-4 text-[#334155] leading-[1.8]"
            >
              <p>
                Experts in Ultrasonics is the non-destructive testing specialist within HITECH
                GROUP, focused on verifying the integrity of industrial materials and equipment.
                Using advanced inspection techniques, we detect internal and surface defects
                without causing any damage to the component under evaluation.
              </p>
              <p>
                Our work covers ultrasonic, dye penetrant and magnetic particle testing, along
                with precise thickness measurement of pipes, vessels and structural members.
                Each test is planned around the material type, service conditions and the
                client&rsquo;s operational requirements.
              </p>
              <p>
                Quality inspection protects people, assets and production. By identifying
                defects early, we help industries avoid unexpected failures, extend equipment
                life and operate within established safety and quality standards.
              </p>
              <p>
                From routine inspections to critical shutdown testing, we deliver results that
                clients can act on with confidence — supporting reliability and long-term
                operational performance.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
            >
              {[
                {
                  icon: ScanSearch,
                  title: "Non-Destructive Testing",
                  description: "Inspection methods that preserve component integrity.",
                },
                {
                  icon: BadgeCheck,
                  title: "Quality Assurance",
                  description: "Structured testing aligned to industry standards.",
                },
                {
                  icon: Target,
                  title: "Accurate Inspection",
                  description: "Precise, repeatable results for critical decisions.",
                },
                {
                  icon: ShieldCheck,
                  title: "Industrial Reliability",
                  description: "Testing that supports safe, dependable operations.",
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

            <motion.div
              variants={itemVariants}
              className="bg-[#0B2D5C] rounded-[20px] mt-8 p-6"
            >
              <p className="text-white font-semibold text-lg">Reliable Inspection. Confident Decisions.</p>
              <p className="text-[rgba(255,255,255,0.8)] text-sm leading-[1.7] mt-2">
                Accurate testing helps improve equipment reliability, safety and operational
                performance across your facility.
              </p>
            </motion.div>
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
            Our Testing Services
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
          >
            Professional Non-Destructive Testing Solutions
          </motion.h2>

          <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
            Experts in Ultrasonics provides accurate inspection services that help industries
            ensure quality, detect defects and maintain operational reliability — without
            damaging components.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 gap-6 mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {[
            {
              icon: ScanSearch,
              title: "Ultrasonic Testing (UT)",
              description:
                "High-frequency ultrasonic waves are used to detect internal flaws and evaluate material integrity without causing any damage to the component.",
            },
            {
              icon: Droplets,
              title: "Dye Penetrant Testing (DPT)",
              description:
                "Surface-breaking defects are identified using penetrant inspection techniques that make fine cracks and discontinuities clearly visible.",
            },
            {
              icon: Magnet,
              title: "Magnetic Particle Testing (MPT)",
              description:
                "Magnetic fields are used to detect surface and near-surface discontinuities in ferromagnetic materials with reliable, sensitive results.",
            },
            {
              icon: Ruler,
              title: "Thickness Measurement",
              description:
                "Ultrasonic thickness measurement monitors corrosion, erosion and remaining wall thickness of industrial equipment for safe continued service.",
            },
          ].map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="relative bg-white rounded-[24px] border border-gray-100 shadow-sm p-7 hover:-translate-y-1 hover:shadow-xl hover:border-[#F4B400] transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#F4B400] rounded-t-[24px] opacity-80" />

                <div className="w-14 h-14 rounded-xl bg-[#F4B400]/10 flex items-center justify-center">
                  <Icon size={26} className="text-[#F4B400]" />
                </div>

                <h3 className="font-bold text-[#0B2D5C] text-lg mt-5">{service.title}</h3>
                <p className="text-sm text-[#334155] leading-[1.7] mt-2">{service.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#0B2D5C] rounded-[24px] mt-10 px-8 py-14 text-center"
        >
          <h3 className="text-white text-2xl md:text-3xl font-extrabold leading-[1.2]">
            Precision Testing for Reliable Industrial Performance
          </h3>
          <p className="text-[rgba(255,255,255,0.8)] leading-[1.8] mt-4 max-w-[760px] mx-auto">
            Advanced inspection techniques help industries improve safety, reduce failures and
            maintain quality standards across their critical equipment and infrastructure.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 h-14 px-9 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl hover:bg-[#d9a000] transition-colors mt-8"
          >
            Discuss Your Inspection Needs
            <ArrowRight size={18} />
          </Link>
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
            Applications &amp; Industries
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
          >
            Trusted Inspection Solutions Across Industrial Sectors
          </motion.h2>

          <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
            Accurate non-destructive testing is essential across multiple industries for
            quality assurance, equipment reliability and operational safety.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {[
            {
              icon: Bolt,
              title: "Power Generation",
              description: "Inspecting boilers, turbines and pressure parts for safe continued operation.",
            },
            {
              icon: Fuel,
              title: "Oil & Gas",
              description: "Testing pipelines, storage tanks and equipment exposed to harsh service.",
            },
            {
              icon: FlaskConical,
              title: "Chemical Plants",
              description: "Verifying vessel integrity and preventing failures in process environments.",
            },
            {
              icon: Cog,
              title: "Manufacturing",
              description: "Quality control of machined components and critical production equipment.",
            },
            {
              icon: Wrench,
              title: "Heavy Engineering",
              description: "Evaluating welds and structural members in heavy machinery and plants.",
            },
            {
              icon: Hammer,
              title: "Fabrication & Construction",
              description: "Checking welded joints and structural integrity during fabrication.",
            },
          ].map((industry) => {
            const Icon = industry.icon
            return (
              <motion.div
                key={industry.title}
                variants={itemVariants}
                className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-7 hover:-translate-y-1 hover:shadow-xl hover:border-[#F4B400] transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#F4B400]/10 flex items-center justify-center">
                  <Icon size={26} className="text-[#F4B400]" />
                </div>
                <h3 className="font-bold text-[#0B2D5C] text-lg mt-5">{industry.title}</h3>
                <p className="text-sm text-[#334155] leading-[1.7] mt-2">{industry.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#0B2D5C] rounded-[24px] mt-10 px-8 py-14 grid lg:grid-cols-2 gap-10 items-center"
        >
          <div>
            <h3 className="text-white text-2xl md:text-3xl font-extrabold leading-[1.2]">
              Inspection That Builds Confidence
            </h3>
            <p className="text-[rgba(255,255,255,0.8)] leading-[1.8] mt-4 max-w-[560px]">
              Regular inspection helps identify defects early, improves equipment reliability and
              supports safer industrial operations across your facility.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { icon: BadgeCheck, label: "Quality Assurance" },
              { icon: Search, label: "Early Defect Detection" },
              { icon: ShieldCheck, label: "Equipment Reliability" },
              { icon: HardHat, label: "Safety Compliance" },
            ].map((chip) => {
              const Icon = chip.icon
              return (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium rounded-full px-4 py-2.5"
                >
                  <Icon size={16} className="text-[#F4B400]" />
                  {chip.label}
                </span>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
    </>
  )
}

export default ExpertsUltrasonics
