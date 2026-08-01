import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Scale,
  Vibrate,
  SprayCan,
  Settings,
  Clock3,
  TrendingUp,
  Wrench,
  Check,
  Cog,
  Gauge,
  ShieldCheck,
  ArrowRight,
  Bolt,
  Hammer,
  Building2,
  FlaskConical,
} from "lucide-react"
import precisionBd from "@/assets/images/home/precision-bd.png"
import aboutSmall from "@/assets/images/home/home-about-small.png"

const expertise = [
  {
    icon: Scale,
    title: "Dynamic Balancing",
    description: "Eliminating vibration in rotating machinery for smooth operation.",
  },
  {
    icon: Vibrate,
    title: "Vibratory Stress Relieving",
    description: "Reducing residual stress in fabricated components and structures.",
  },
  {
    icon: SprayCan,
    title: "Jet Cleaning",
    description: "High-pressure cleaning that restores equipment performance.",
  },
  {
    icon: Settings,
    title: "Engineering Support Services",
    description: "Technical assistance for maintenance and industrial operations.",
  },
]

const bottomStrip = [
  { icon: Settings, label: "Precision Engineering" },
  { icon: Clock3, label: "Reduced Downtime" },
  { icon: TrendingUp, label: "Improved Performance" },
  { icon: Wrench, label: "Reliable Maintenance" },
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

function PrecisionTech() {
  return (
    <>
      <section className="relative bg-[#082A57] overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${precisionBd})`,
          }}
        />
        <div className="absolute inset-0 bg-[rgba(8,42,87,0.8)]" />
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
              Precision Tech Engineering Services
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-white text-[38px] leading-[1.1] lg:text-[60px] lg:leading-[1.05] font-extrabold max-w-[680px] mt-2 mx-auto lg:mx-0"
            >
              Engineering Solutions for Reliable Industrial Performance
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-[rgba(255,255,255,0.85)] text-lg lg:text-xl leading-[1.7] max-w-[560px] mt-4 mx-auto lg:mx-0"
            >
              Precision Tech Engineering Services provides specialized engineering solutions —
              including dynamic balancing, vibratory stress relieving and industrial
              maintenance — to improve equipment performance, reduce downtime and enhance
              operational efficiency.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start"
            >
              <Link
                to="/divisions/precision-tech"
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
              <h3 className="text-lg font-bold text-[#0B2D5C] mb-6">Core Engineering Expertise</h3>
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
                  src={precisionBd}
                  alt="Precision Tech engineering operations"
                  className="w-full h-[420px] md:h-[500px] object-cover"
                />
              </div>

              <div className="absolute -top-4 -right-4 rounded-[20px] overflow-hidden shadow-lg w-[160px] md:w-[200px]">
                <img
                  src={aboutSmall}
                  alt="Maintenance service detail"
                  className="w-full h-[110px] md:h-[140px] object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-4 md:left-0 bg-white rounded-[20px] shadow-2xl p-5 max-w-[280px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F4B400]/10 flex items-center justify-center shrink-0">
                    <Cog size={20} className="text-[#F4B400]" />
                  </div>
                  <h4 className="font-bold text-[#0B2D5C] text-sm">
                    Engineering Excellence. Industrial Maintenance.
                  </h4>
                </div>
                <ul className="mt-3 space-y-2">
                  {["Machines kept running reliably", "Downtime kept to a minimum"].map((point) => (
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
              About the Division
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
            >
              Specialized Engineering Services That Keep Industries Running
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="mt-6 space-y-4 text-[#334155] leading-[1.8]"
            >
              <p>
                Precision Tech Engineering Services is the engineering and maintenance
                specialist within HITECH GROUP, dedicated to keeping industrial machinery
                balanced, stress-free and performing at its best. Our work protects the
                rotating equipment that production depends on.
              </p>
              <p>
                Our expertise spans dynamic balancing, vibratory stress relieving, jet
                cleaning and a range of engineering support services. Each engagement is
                planned around the equipment&rsquo;s condition, the operating environment and
                the client&rsquo;s production goals.
              </p>
              <p>
                We focus on equipment performance, reliability and operational efficiency —
                preventing small issues from becoming costly failures and extending the useful
                life of industrial assets.
              </p>
              <p>
                Our commitment is simple: dependable engineering solutions, delivered on
                schedule and backed by disciplined workmanship on every site.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
            >
              {[
                {
                  icon: Cog,
                  title: "Engineering Expertise",
                  description: "Specialized technical capability for industrial machinery.",
                },
                {
                  icon: Wrench,
                  title: "Preventive Maintenance",
                  description: "Proactive care that prevents breakdowns and failures.",
                },
                {
                  icon: Gauge,
                  title: "Performance Optimization",
                  description: "Fine-tuning equipment for maximum operating efficiency.",
                },
                {
                  icon: ShieldCheck,
                  title: "Reliable Technical Support",
                  description: "Dependable engineering assistance whenever it is needed.",
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
              <p className="text-white font-semibold text-lg">
                Engineering Solutions Built for Long-Term Performance
              </p>
              <p className="text-[rgba(255,255,255,0.8)] text-sm leading-[1.7] mt-2">
                Specialized engineering services help improve machine efficiency, reduce
                downtime and extend equipment life.
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
            Our Engineering Services
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
          >
            Specialized Engineering &amp; Industrial Maintenance Solutions
          </motion.h2>

          <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
            Precision Tech Engineering Services delivers specialized engineering solutions
            designed to improve equipment performance, minimize downtime and enhance
            operational efficiency across industrial facilities.
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
              icon: Scale,
              title: "Dynamic Balancing",
              description:
                "Dynamic balancing minimizes vibration in rotating equipment, improving operational stability and extending machinery life.",
            },
            {
              icon: Vibrate,
              title: "Vibratory Stress Relieving (VSR)",
              description:
                "Controlled vibration reduces residual stresses in fabricated and welded components, improving dimensional stability and reducing distortion.",
            },
            {
              icon: SprayCan,
              title: "Jet Cleaning Services",
              description:
                "High-pressure jet cleaning removes scale, deposits and contaminants from industrial equipment to maintain efficiency and reliability.",
            },
            {
              icon: Settings,
              title: "Engineering Support Services",
              description:
                "Technical engineering assistance and maintenance solutions help industries optimize equipment performance and improve operational reliability.",
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
            Reliable Engineering Solutions for Critical Industrial Assets
          </h3>
          <p className="text-[rgba(255,255,255,0.8)] leading-[1.8] mt-4 max-w-[760px] mx-auto">
            Proactive engineering services help industries improve equipment efficiency,
            reduce maintenance costs and maximize long-term operational performance.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 h-14 px-9 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl hover:bg-[#d9a000] transition-colors mt-8"
          >
            Explore Our Expertise
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
            Industries &amp; Applications
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
          >
            Engineering Expertise Supporting Diverse Industrial Operations
          </motion.h2>

          <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
            Precision Tech Engineering Services supports a wide range of industrial operations
            with specialized engineering, maintenance and equipment optimization services that
            improve reliability and operational efficiency.
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
              title: "Power Plants",
              description: "Balancing and maintenance services for turbines and rotating equipment.",
            },
            {
              icon: Cog,
              title: "Manufacturing Industries",
              description: "Engineering support that keeps production machinery running reliably.",
            },
            {
              icon: Hammer,
              title: "Steel & Metal Processing",
              description: "Stress-relieving and balancing for heavy processing machinery.",
            },
            {
              icon: Building2,
              title: "Cement Plants",
              description: "Maintenance solutions for kilns, mills and high-load drive systems.",
            },
            {
              icon: FlaskConical,
              title: "Chemical Industries",
              description: "Engineering services that sustain critical process equipment.",
            },
            {
              icon: Wrench,
              title: "Heavy Engineering & Fabrication",
              description: "Vibration and stress control for fabricated structures and machines.",
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
              Engineering Solutions That Drive Operational Excellence
            </h3>
            <p className="text-[rgba(255,255,255,0.8)] leading-[1.8] mt-4 max-w-[560px]">
              Services such as dynamic balancing, vibratory stress relieving and industrial
              maintenance help organizations improve equipment reliability, extend machinery
              life and reduce unplanned downtime.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { icon: ShieldCheck, label: "Equipment Reliability" },
              { icon: Clock3, label: "Reduced Downtime" },
              { icon: Gauge, label: "Performance Optimization" },
              { icon: Cog, label: "Technical Expertise" },
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

export default PrecisionTech
