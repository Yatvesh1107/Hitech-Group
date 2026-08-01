import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import heroBg from "@/assets/images/about/hero-bg.png"
import {
  Award,
  ShieldCheck,
  Cog,
  Handshake,
  Check,
  BadgeCheck,
  Factory,
  Users,
  Globe,
} from "lucide-react"
import clients from "../data/clients"

const clientDomains = [
  "Sugar Industry",
  "Paper & Pulp",
  "Food Processing",
  "Heavy Engineering",
  "Power Generation",
  "Chemical Processing",
  "Pharmaceutical",
  "Manufacturing",
]

const trustValues = [
  {
    icon: Award,
    title: "Consistent Quality",
    description:
      "Every engagement is delivered against structured quality standards, earning the trust of leading industrial organizations.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Delivery",
    description:
      "Clients rely on us for on-time, on-spec execution across insulation, testing, and engineering services.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnerships",
    description:
      "We build lasting relationships through dependable service, technical depth, and a genuine understanding of client needs.",
  },
  {
    icon: Cog,
    title: "Engineering Expertise",
    description:
      "Specialized knowledge across multiple industrial domains allows us to solve complex operational challenges.",
  },
]

const heroStats = [
  { value: "50+", label: "Trusted Clients" },
  { value: "8+", label: "Industries Served" },
  { value: "12+", label: "Years of Experience" },
  { value: "ISO", label: "9001:2015 Certified" },
]

const bottomStrip = [
  { icon: Factory, label: "Industrial Clients" },
  { icon: BadgeCheck, label: "Trusted Delivery" },
  { icon: Users, label: "Long-Term Partners" },
  { icon: Globe, label: "Pan-India Reach" },
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
  visible: { transition: { staggerChildren: 0.06 } },
}

const gridCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

function Clients() {
  return (
    <>
      <section className="relative bg-[#082A57] overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${heroBg})`,
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
                Our Clients
              </motion.span>

              <motion.h1
                variants={itemVariants}
                className="text-white text-[38px] leading-[1.1] lg:text-[60px] lg:leading-[1.05] font-extrabold max-w-[680px] mt-3 mx-auto lg:mx-0"
              >
                Trusted by Industry Leaders
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-[rgba(255,255,255,0.85)] text-lg lg:text-xl leading-[1.7] max-w-[560px] mt-5 mx-auto lg:mx-0"
              >
                Leading organizations across sugar, paper, food processing, manufacturing, and
                heavy engineering rely on HITECH GROUP for dependable insulation, inspection, and
                precision engineering solutions.
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
                  Become a Client
                </Link>
              </motion.div>
            </div>

            <motion.div variants={cardVariants} className="max-lg:mt-8">
              <div className="bg-white/90 backdrop-blur-md rounded-[24px] shadow-2xl p-8 max-w-[480px] mx-auto lg:mx-0 lg:ml-auto">
                <h3 className="text-lg font-bold text-[#0B2D5C] mb-6">Our Client Network</h3>
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
                  Our clients value dependable execution, technical expertise, and a genuine
                  commitment to their operational success.
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

      <section className="bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #0B2D5C 0.5px, transparent 0.5px)",
            backgroundSize: "30px 30px",
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
              Client Network
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[#0B2D5C] text-[34px] md:text-[42px] lg:text-[56px] font-extrabold leading-[1.1] mt-3"
            >
              Partnering with Some of India&apos;s Leading Industries
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#334155] text-lg leading-[1.7] mt-4"
            >
              HITECH GROUP has successfully delivered engineering, insulation, and industrial
              services to organizations across sugar, paper, food processing, manufacturing, and
              heavy engineering sectors.
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {clients.map((client) => (
              <motion.div
                key={client.name}
                variants={gridCardVariants}
                className="bg-white border border-gray-100 rounded-[18px] p-7 flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:border-[#F4B400] hover:shadow-lg transition-all duration-300 min-h-[130px]"
              >
                {client.logo ? (
                  <div className="h-[56px] w-full flex items-center justify-center mb-3">
                    <img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      className="max-h-[56px] max-w-[150px] object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-[68px] h-[68px] rounded-full bg-[#F4B400]/10 flex items-center justify-center mb-3">
                    <span className="text-lg font-bold text-[#0B2D5C] tracking-tight">
                      {client.initials}
                    </span>
                  </div>
                )}
                <span className="text-sm font-semibold text-[#0F172A] leading-tight">
                  {client.name}
                </span>
                <span className="text-[11px] text-[#94A3B8] mt-1">{client.domain}</span>
              </motion.div>
            ))}
          </motion.div>
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
          <div className="text-center max-w-[700px] mx-auto mb-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
            >
              Why Clients Choose Us
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[#0B2D5C] text-[34px] md:text-[42px] lg:text-[56px] font-extrabold leading-[1.1] mt-3"
            >
              Building Long-Term Industrial Partnerships
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#334155] text-lg leading-[1.7] mt-4"
            >
              We believe in lasting relationships built on trust, consistent delivery, and a deep
              understanding of our clients&apos; industrial needs.
            </motion.p>
          </div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {trustValues.map((value) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  variants={gridCardVariants}
                  className="bg-white border border-gray-100 rounded-[22px] p-7 hover:-translate-y-1.5 hover:border-[#F4B400] hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#F4B400]/10 flex items-center justify-center mb-5">
                    <Icon size={28} className="text-[#F4B400]" />
                  </div>
                  <h4 className="text-lg font-bold text-[#0F172A]">{value.title}</h4>
                  <p className="text-sm text-[#334155] mt-3 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
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
          <div className="text-center max-w-[700px] mx-auto mb-8">
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
              Serving Critical Industrial Sectors
            </motion.h2>
          </div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {clientDomains.map((domain) => (
              <motion.div
                key={domain}
                variants={gridCardVariants}
                className="flex items-center gap-3 bg-[#F8FAFC] border border-gray-100 rounded-[14px] px-5 py-4 hover:border-[#F4B400] transition-colors"
              >
                <Check size={16} className="text-[#F4B400] shrink-0" />
                <span className="text-sm font-medium text-[#0F172A]">{domain}</span>
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
                  Ready to Work with a Trusted Engineering Partner?
                </h3>
                <p className="text-[rgba(255,255,255,0.8)] mt-4 leading-relaxed">
                  Connect with HITECH GROUP to discuss how our insulation, testing, and engineering
                  expertise can support your operations.
                </p>
              </div>
              <Link
                to="/contact"
                className="h-14 px-8 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl inline-flex items-center justify-center hover:bg-[#d9a000] transition-colors shrink-0"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Clients
