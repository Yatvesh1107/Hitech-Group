import { Fragment } from "react"
import { Link, useLocation } from "react-router-dom"
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
  Activity,
  AlertTriangle,
  Anchor,
  BadgeCheck,
  ClipboardList,
  Factory,
  Flame,
  Layers,
  MapPin,
  Ruler,
  Search,
  Sparkles,
  Truck,
  Waves,
  Weight,
  Zap,
  Mail,
} from "lucide-react"
import precisionBd from "@/assets/images/home/precision-bd.png"
import PrecisionTechProducts from "../components/sections/PrecisionTechProducts"
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
  const location = useLocation()
  const isProducts = location.pathname === "/divisions/precision-tech/products"

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

            <motion.div
              variants={itemVariants}
              className="mt-5 flex items-center gap-2.5 justify-center lg:justify-start"
            >
              <Mail size={18} className="text-[#F4B400] shrink-0" />
              <a
                href="mailto:precisiontechenggservices@gmail.com"
                className="text-white/90 hover:text-[#F4B400] transition-colors break-all"
              >
                precisiontechenggservices@gmail.com
              </a>
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

    {isProducts ? (
      <PrecisionTechProducts />
    ) : (
      <>
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

    <section className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-8 lg:py-10">
        <motion.div
          className="max-w-[760px] mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
          >
            Vibratory Stress Relieving
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
          >
            Advanced Residual Stress Relief for Shafts, Heavy Fabrications &amp; Precision Components
          </motion.h2>

          <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
            Vibratory Stress Relieving (VSR) is a non-thermal process used to reduce and
            redistribute residual stresses in metallic components through controlled mechanical
            vibration — available on-site and in our workshop.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mt-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3 variants={itemVariants} className="font-bold text-[#0B2D5C] text-2xl">
              Why Vibratory Stress Relieving?
            </motion.h3>

            <motion.div
              variants={itemVariants}
              className="mt-5 space-y-4 text-[#334155] leading-[1.8]"
            >
              <p>
                Residual stresses are introduced into components during manufacturing — during
                welding, fabrication, casting, forging, machining, turning, milling, grinding,
                cutting, boring, heat cycles and weld repair. These internal stresses can remain
                locked inside the component even after manufacturing is completed.
              </p>
              <p>
                When the component is subsequently machined, assembled or placed into service,
                these stresses can redistribute and cause distortion, warping, dimensional
                change, loss of alignment and premature fatigue-related problems.
              </p>
              <p>
                VSR improves the dimensional stability of the component by applying controlled
                mechanical vibration and allowing residual stresses to redistribute safely.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#0B2D5C] rounded-[20px] mt-6 p-6">
              <p className="text-white font-semibold">Without VSR, locked-in stresses can cause:</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  "Distortion",
                  "Warping",
                  "Dimensional changes",
                  "Loss of alignment",
                  "Machining movement",
                  "Premature fatigue problems",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 bg-white/10 text-white text-sm rounded-full px-3.5 py-1.5"
                  >
                    <AlertTriangle size={14} className="text-[#F4B400]" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              variants={itemVariants}
              className="bg-[#F8FAFC] border border-gray-100 rounded-[24px] p-7"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F4B400]/10 flex items-center justify-center shrink-0">
                  <Waves size={20} className="text-[#F4B400]" />
                </div>
                <h4 className="font-bold text-[#0B2D5C]">Where Residual Stresses Come From</h4>
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                {[
                  "Welding",
                  "Fabrication",
                  "Casting",
                  "Forging",
                  "Machining",
                  "Turning",
                  "Milling",
                  "Grinding",
                  "Cutting",
                  "Boring",
                  "Heat cycles",
                  "Weld repair & modification",
                ].map((source) => (
                  <span
                    key={source}
                    className="inline-flex items-center gap-1.5 bg-white text-[#0B2D5C] text-sm font-medium rounded-full border border-gray-200 px-3.5 py-1.5"
                  >
                    <Check size={14} className="text-[#F4B400]" />
                    {source}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6">
              <h4 className="font-bold text-[#0B2D5C] text-lg">How VSR Works</h4>
              <div className="mt-3 space-y-4 text-[#334155] leading-[1.8]">
                <p>
                  Every component has natural modes of vibration and characteristic frequencies.
                  Our VSR equipment introduces controlled mechanical vibration into the
                  workpiece. The component is supported appropriately and a vibration exciter is
                  securely mounted at a selected location.
                </p>
                <p>
                  At suitable frequencies, the component undergoes controlled cyclic deformation.
                  The applied dynamic stresses interact with the existing residual stress field,
                  promoting localized stress redistribution and relaxation — improving the
                  dimensional stability of the component.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white border border-gray-100 rounded-[24px] shadow-sm mt-10 p-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4">
            {[
              "Manufacturing",
              "Residual Stress",
              "Controlled Vibration",
              "Stress Redistribution",
              "Improved Stability",
            ].map((step, index) => (
              <Fragment key={step}>
                {index > 0 && <ArrowRight size={18} className="text-[#F4B400]" />}
                <span className="inline-flex items-center gap-2 bg-[#F4B400]/10 text-[#0B2D5C] font-semibold rounded-full px-4 py-2">
                  <Waves size={15} className="text-[#F4B400]" />
                  {step}
                </span>
              </Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    <section className="bg-[#F8FAFC]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-8 lg:py-10">
        <motion.div
          className="max-w-[760px] mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
          >
            VSR Applications
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
          >
            Specialized Stress Relieving for Shafts, Fabrications &amp; Precision Components
          </motion.h2>

          <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
            Our VSR service covers large shafts, heavy fabrications, castings, machined
            components and weld-repaired parts — each evaluated for material, geometry and
            application before treatment.
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
              icon: Cog,
              title: "VSR for Large Shafts",
              description:
                "Shafts develop significant residual stresses during forging, welding, machining, keyway cutting, turning and grinding. VSR stabilizes them before critical finishing operations.",
              items: [
                "Turbine shafts",
                "Generator shafts",
                "Roller shafts",
                "Mill rolls",
                "Crusher shafts",
                "Gear shafts",
              ],
              note: "After fabrication → before rough machining → after rough machining → before final machining/grinding.",
            },
            {
              icon: Factory,
              title: "Heavy Welded Fabrications",
              description:
                "Machine frames, structural fabrications and heavy-duty assemblies treated after fabrication to control movement before machining and assembly.",
              items: [
                "Machine frames",
                "Structural fabrications",
                "Base frames",
                "Machine beds",
                "Columns",
                "Heavy brackets",
              ],
              note: "Subject to engineering evaluation of the material, geometry and application.",
            },
            {
              icon: Layers,
              title: "Cast Components",
              description:
                "Cast iron and cast steel components, large machine castings and housings stabilized for subsequent machining and dimensional accuracy.",
              items: [
                "Cast iron components",
                "Cast steel components",
                "Large machine castings",
                "Machine bases",
                "Housing castings",
                "Heavy engineering castings",
              ],
              note: "Evaluated before treatment to confirm a suitable response.",
            },
            {
              icon: Settings,
              title: "Machined Components",
              description:
                "Large machined jobs and precision structures requiring dimensional stabilization before or after machining and finishing operations.",
              items: [
                "Machine beds",
                "Large plates",
                "Precision structures",
                "Boring machine components",
                "Milling machine structures",
                "Large fabricated assemblies",
              ],
              note: "VSR may be incorporated at different manufacturing stages when required.",
            },
            {
              icon: Wrench,
              title: "Weld-Repaired Components",
              description:
                "VSR can be considered after weld repair and build-up to redistribute repair-induced residual stresses before further processing.",
              items: [
                "Shaft weld repair",
                "Crack repair",
                "Build-up welding",
                "Overlay welding",
                "Fabrication modification",
                "Structural repair",
              ],
              note: "Redistributes stresses introduced during repair and modification.",
            },
          ].map((application) => {
            const Icon = application.icon
            return (
              <motion.div
                key={application.title}
                variants={itemVariants}
                className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-7 hover:-translate-y-1 hover:shadow-xl hover:border-[#F4B400] transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#F4B400]/10 flex items-center justify-center">
                  <Icon size={26} className="text-[#F4B400]" />
                </div>
                <h3 className="font-bold text-[#0B2D5C] text-lg mt-5">{application.title}</h3>
                <p className="text-sm text-[#334155] leading-[1.7] mt-2">
                  {application.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {application.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 bg-[#F8FAFC] text-[#0B2D5C] text-xs font-medium rounded-full border border-gray-200 px-3 py-1.5"
                    >
                      <Check size={12} className="text-[#F4B400]" />
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-4 bg-[#F4B400]/10 rounded-xl px-4 py-3">
                  <p className="text-xs text-[#334155] leading-[1.6]">{application.note}</p>
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
          className="max-w-[760px] mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
          >
            Our VSR Process
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
          >
            A Controlled, Engineering-Based Treatment Approach
          </motion.h2>

          <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
            Every VSR job is approached as an engineering process — from assessment and
            mounting to controlled treatment, monitoring and documentation.
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
              icon: Search,
              step: "01",
              title: "Component Assessment",
              description:
                "We study component dimensions, weight, material, geometry, manufacturing history, weld locations, machining condition, critical dimensions and application requirements.",
            },
            {
              icon: Anchor,
              step: "02",
              title: "Proper Support & Mounting",
              description:
                "The component is positioned on suitable supports. The vibration exciter is securely mounted — with specialized arrangements for shafts and cylindrical components.",
            },
            {
              icon: Activity,
              step: "03",
              title: "Frequency Analysis",
              description:
                "Controlled frequency scanning identifies suitable vibration response and resonance conditions while component response is monitored.",
            },
            {
              icon: Waves,
              step: "04",
              title: "Controlled Vibration Treatment",
              description:
                "Selected vibration conditions are applied for the required treatment cycle, tuned to geometry, mass, material and resonant response.",
            },
            {
              icon: ClipboardList,
              step: "05",
              title: "Monitoring & Documentation",
              description:
                "Vibration response and treatment parameters are monitored and recorded. Reports, frequency graphs and process certificates can be provided.",
            },
            {
              icon: BadgeCheck,
              step: "06",
              title: "Completion",
              description:
                "After treatment, the component is released for the next manufacturing operation — machining, grinding, assembly or inspection.",
            },
          ].map((process) => {
            const Icon = process.icon
            return (
              <motion.div
                key={process.title}
                variants={itemVariants}
                className="relative bg-white rounded-[24px] border border-gray-100 shadow-sm p-7 hover:-translate-y-1 hover:shadow-xl hover:border-[#F4B400] transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#F4B400] rounded-t-[24px] opacity-80" />
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-xl bg-[#F4B400]/10 flex items-center justify-center">
                    <Icon size={26} className="text-[#F4B400]" />
                  </div>
                  <span className="text-3xl font-extrabold text-[#F4B400]/25">{process.step}</span>
                </div>
                <h3 className="font-bold text-[#0B2D5C] text-lg mt-5">{process.title}</h3>
                <p className="text-sm text-[#334155] leading-[1.7] mt-2">{process.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>

    <section className="bg-[#F8FAFC]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-8 lg:py-10">
        <motion.div
          className="max-w-[760px] mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
          >
            VSR vs Thermal Stress Relieving
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
          >
            Non-Thermal Technology with Proven Advantages
          </motion.h2>

          <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
            VSR provides dimensional stability comparable to thermal treatment in suitable
            applications — without the furnace, energy and logistics burden.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden mt-8"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="bg-[#0B2D5C]">
                  <th className="px-6 py-4 text-white font-semibold text-sm">Feature</th>
                  <th className="px-6 py-4 text-white font-semibold text-sm">
                    <span className="inline-flex items-center gap-2">
                      <Waves size={16} className="text-[#F4B400]" />
                      VSR
                    </span>
                  </th>
                  <th className="px-6 py-4 text-white font-semibold text-sm">
                    <span className="inline-flex items-center gap-2">
                      <Flame size={16} className="text-[#F4B400]" />
                      Thermal Stress Relief
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Principle", "Controlled mechanical vibration", "Controlled heating and cooling"],
                  ["Heating required", "No", "Yes"],
                  ["Furnace required", "No", "Usually"],
                  ["Large components", "Can be performed on-site", "Furnace size can be limiting"],
                  ["Distortion risk", "Generally very low", "Cooling/heating can introduce distortion"],
                  ["Surface oxidation / scale", "No thermal scaling", "Possible"],
                  ["Treatment time", "Generally much shorter", "Often requires heating, soaking and controlled cooling"],
                  ["On-site treatment", "Possible", "Usually difficult"],
                  ["Metallurgical transformation", "No intentional metallurgical change", "May occur depending on material/process"],
                  ["Energy requirement", "Relatively low", "Significantly higher"],
                ].map((row, index) => (
                  <tr
                    key={row[0]}
                    className={`border-b border-gray-100 ${index % 2 === 1 ? "bg-[#F8FAFC]" : ""}`}
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-[#0B2D5C]">{row[0]}</td>
                    <td className="px-6 py-4 text-sm text-[#334155] bg-[#F4B400]/5">
                      <span className="inline-flex items-start gap-2">
                        <Check size={15} className="text-[#F4B400] mt-0.5 shrink-0" />
                        {row[1]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#334155]">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#0B2D5C] rounded-[24px] mt-8 px-8 py-8 flex flex-col lg:flex-row items-start lg:items-center gap-6"
        >
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <ShieldCheck size={24} className="text-[#F4B400]" />
          </div>
          <p className="text-[rgba(255,255,255,0.9)] leading-[1.8] text-sm lg:text-base">
            <span className="text-white font-semibold">Important engineering note: </span>
            VSR provides dimensional stability comparable to thermal treatment in suitable
            applications, but it does not provide the metallurgical effects of thermal
            treatment. It should not automatically be considered a substitute where a code or
            specification specifically requires PWHT / thermal treatment.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-8 lg:py-10">
        <motion.div
          className="max-w-[760px] mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
          >
            Major Advantages
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
          >
            Why Industries Choose VSR
          </motion.h2>

          <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
            VSR delivers effective residual-stress control where dimensional stability and
            reduced distortion matter most.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {[
            {
              icon: Weight,
              title: "Large & Heavy Components",
              description: "Treated at the customer's premises, avoiding unnecessary transportation and handling.",
            },
            {
              icon: Waves,
              title: "Low-Distortion Process",
              description: "Non-thermal — avoids the heating and cooling cycles of conventional thermal stress relieving.",
            },
            {
              icon: Zap,
              title: "No Furnace Required",
              description: "Treatment is carried out at the component location where suitable conditions are available.",
            },
            {
              icon: Clock3,
              title: "Faster Processing",
              description: "Much faster than furnace-based treatment — no heating, soaking and controlled cooling cycle.",
            },
            {
              icon: Sparkles,
              title: "No Scaling or Discoloration",
              description: "The component is not exposed to a high-temperature furnace cycle.",
            },
            {
              icon: Ruler,
              title: "Before Precision Machining",
              description: "Helps stabilize components before subsequent machining and finishing operations.",
            },
            {
              icon: Truck,
              title: "On-Site Service",
              description: "Equipment can be mobilized to your plant or fabrication facility for large components.",
            },
            {
              icon: TrendingUp,
              title: "Cost & Logistics Benefits",
              description: "Avoiding furnace transport simplifies logistics and reduces handling requirements.",
            },
          ].map((advantage) => {
            const Icon = advantage.icon
            return (
              <motion.div
                key={advantage.title}
                variants={itemVariants}
                className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-7 hover:-translate-y-1 hover:shadow-xl hover:border-[#F4B400] transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#F4B400]/10 flex items-center justify-center">
                  <Icon size={26} className="text-[#F4B400]" />
                </div>
                <h3 className="font-bold text-[#0B2D5C] text-lg mt-5">{advantage.title}</h3>
                <p className="text-sm text-[#334155] leading-[1.7] mt-2">{advantage.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>

    <section className="bg-[#F8FAFC]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-8 lg:py-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
              On-Site VSR Service
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
            >
              We Bring the VSR Equipment to Your Site
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="mt-6 space-y-4 text-[#334155] leading-[1.8]"
            >
              <p>
                For large shafts and heavy components, transportation itself can be expensive
                and complicated. Our mobile VSR service allows the treatment equipment to be
                taken directly to the customer&rsquo;s site — a particular advantage for large
                and heavy components that cannot be easily transported to a conventional
                stress-relieving facility.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6">
              <h4 className="font-bold text-[#0B2D5C] text-lg">Where We Work</h4>
              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  "Factory",
                  "Fabrication Yard",
                  "Foundry",
                  "Power Plant",
                  "Steel Plant",
                  "Cement Plant",
                  "Sugar Factory",
                  "Engineering Workshop",
                ].map((location) => (
                  <span
                    key={location}
                    className="inline-flex items-center gap-1.5 bg-white text-[#0B2D5C] text-sm font-medium rounded-full border border-gray-200 px-3.5 py-1.5"
                  >
                    <MapPin size={14} className="text-[#F4B400]" />
                    {location}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-[#0B2D5C] rounded-[20px] mt-6 p-6 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Truck size={20} className="text-[#F4B400]" />
              </div>
              <p className="text-[rgba(255,255,255,0.9)] text-sm leading-[1.7]">
                Portable VSR systems are specifically used for on-site treatment of large
                components and fabrications — reducing transportation and handling difficulties.
              </p>
            </motion.div>
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
              Industries We Serve
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[44px] font-extrabold leading-[1.1] mt-3"
            >
              VSR Across Heavy Engineering Industries
            </motion.h2>

            <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-4 mt-6">
              {[
                { icon: Zap, title: "Power Generation", description: "Turbines, generator components, shafts and machine bases." },
                { icon: Hammer, title: "Steel & Metal", description: "Rolls, shafts, fabricated structures and heavy assemblies." },
                { icon: Building2, title: "Cement Plants", description: "Kiln components, heavy structures and machine bases." },
                { icon: Cog, title: "Sugar Industry", description: "Mill shafts, pinions, rollers and heavy machine components." },
                { icon: Wrench, title: "Mining", description: "Crusher components, heavy frames, shafts and structures." },
                { icon: FlaskConical, title: "Foundries & General Engineering", description: "Large castings and machined components needing stabilization." },
                { icon: Factory, title: "Machine Building", description: "Machine beds, columns, bases, frames and precision structures." },
                { icon: Settings, title: "Railways, Shipbuilding & Heavy Eng", description: "Large fabricated and machined components needing dimensional stability." },
              ].map((industry) => {
                const Icon = industry.icon
                return (
                  <div
                    key={industry.title}
                    className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-5 hover:-translate-y-1 hover:shadow-lg hover:border-[#F4B400] transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#F4B400]/10 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-[#F4B400]" />
                      </div>
                      <h4 className="font-semibold text-[#0B2D5C] text-sm">{industry.title}</h4>
                    </div>
                    <p className="text-xs text-[#334155] leading-[1.6] mt-2">
                      {industry.description}
                    </p>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-8 lg:py-10">
        <motion.div
          className="max-w-[760px] mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
          >
            Why Choose Us
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
          >
            Specialized VSR Engineering for Critical Components
          </motion.h2>
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
              icon: Vibrate,
              title: "Specialized VSR Engineering",
              description: "Focused on controlled treatment of large shafts, heavy components and fabricated structures.",
            },
            {
              icon: Truck,
              title: "On-Site Capability",
              description: "Equipment mobilized to the component location, reducing transportation and handling difficulties.",
            },
            {
              icon: Cog,
              title: "Shaft Treatment Expertise",
              description: "Specialized mounting arrangements developed for cylindrical and long shaft components.",
            },
            {
              icon: Weight,
              title: "Heavy Job Capability",
              description: "For components where conventional furnace treatment is difficult because of size, weight or logistics.",
            },
            {
              icon: Settings,
              title: "Engineering-Based Approach",
              description: "Each component is evaluated for geometry, material, weight and required outcome before parameters are selected.",
            },
            {
              icon: ShieldCheck,
              title: "Quality & Documentation",
              description: "Correct assessment, controlled parameters and documented treatment reports on request.",
            },
          ].map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-7 hover:-translate-y-1 hover:shadow-xl hover:border-[#F4B400] transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#F4B400]/10 flex items-center justify-center">
                  <Icon size={26} className="text-[#F4B400]" />
                </div>
                <h3 className="font-bold text-[#0B2D5C] text-lg mt-5">{feature.title}</h3>
                <p className="text-sm text-[#334155] leading-[1.7] mt-2">{feature.description}</p>
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
              Get Your Component Evaluated
            </h3>
            <p className="text-[rgba(255,255,255,0.8)] leading-[1.8] mt-4 max-w-[560px]">
              Planning VSR for a shaft, casting, welded fabrication or heavy machined component?
              Send us your component details and our technical team will evaluate it and
              recommend a suitable treatment approach.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 h-14 px-9 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl hover:bg-[#d9a000] transition-colors mt-8"
            >
              Request Component Evaluation
              <ArrowRight size={18} />
            </Link>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Please Share
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                "Component name",
                "Material",
                "Length × Width × Height / Diameter",
                "Approximate weight",
                "Drawing, if available",
                "Current manufacturing stage",
                "Reason for stress relieving",
                "Required dimensional tolerance",
                "Customer / code requirements",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium rounded-full px-4 py-2.5"
                >
                  <Check size={15} className="text-[#F4B400] shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
      </>
    )}
    </>
  )
}

export default PrecisionTech
