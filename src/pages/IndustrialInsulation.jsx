import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Flame,
  Snowflake,
  Volume2,
  Building2,
  Zap,
  BadgeCheck,
  Wrench,
  Factory,
  Check,
  ShieldCheck,
  Vibrate,
  ArrowRight,
  Bolt,
  FlaskConical,
  UtensilsCrossed,
  Pill,
  Cog,
  Hammer,
  Layers,
} from "lucide-react"

const expertise = [
  {
    icon: Flame,
    title: "Thermal Insulation",
    description: "Controlling heat loss and maintaining process temperatures.",
  },
  {
    icon: Snowflake,
    title: "Cold Insulation",
    description: "Protecting low-temperature and cryogenic systems.",
  },
  {
    icon: Volume2,
    title: "Acoustic Insulation",
    description: "Reducing industrial noise for safer, quieter sites.",
  },
  {
    icon: Building2,
    title: "Roofing & Industrial Insulation",
    description: "Weather protection and thermal comfort for facilities.",
  },
]

const bottomStrip = [
  { icon: Zap, label: "Energy Efficient" },
  { icon: BadgeCheck, label: "Quality Materials" },
  { icon: Wrench, label: "Expert Installation" },
  { icon: Factory, label: "Industrial Solutions" },
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

function IndustrialInsulation() {
  return (
    <>
      <section className="relative bg-[#082A57] overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/home/hitech-bd.png')",
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
              Hitech Industrial Insulation
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-white text-[38px] leading-[1.1] lg:text-[60px] lg:leading-[1.05] font-extrabold max-w-[680px] mt-3 mx-auto lg:mx-0"
            >
              Reliable Industrial Insulation Solutions for Modern Industries
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-[rgba(255,255,255,0.85)] text-lg lg:text-xl leading-[1.7] max-w-[560px] mt-5 mx-auto lg:mx-0"
            >
              Hitech Industrial Insulation provides thermal, cold, acoustic and industrial
              insulation solutions focused on efficiency, safety and long-term performance. From
              process piping to facility roofs, we deliver insulation that protects equipment,
              conserves energy and extends operational life.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mt-9 justify-center lg:justify-start"
            >
              <Link
                to="/divisions/industrial-insulation"
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
              <h3 className="text-lg font-bold text-[#0B2D5C] mb-6">Our Core Expertise</h3>
              <div className="space-y-5">
                {expertise.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="flex gap-4">
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
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-24">
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
                  src="/images/home/hitech-bd.png"
                  alt="Hitech Industrial Insulation operations"
                  className="w-full h-[420px] md:h-[500px] object-cover"
                />
              </div>

              <div className="absolute -top-4 -right-4 rounded-[20px] overflow-hidden shadow-lg w-[160px] md:w-[200px]">
                <img
                  src="/images/home/home-about-small.png"
                  alt="Insulation detail"
                  className="w-full h-[110px] md:h-[140px] object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-4 md:left-0 bg-white rounded-[20px] shadow-2xl p-5 max-w-[280px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F4B400]/10 flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} className="text-[#F4B400]" />
                  </div>
                  <h4 className="font-bold text-[#0B2D5C] text-sm">
                    Quality Workmanship. Reliable Solutions.
                  </h4>
                </div>
                <ul className="mt-3 space-y-2">
                  {["Skilled, disciplined installation", "Consistent quality standards"].map(
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
              Specialized Industrial Insulation Solutions
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="mt-6 space-y-4 text-[#334155] leading-[1.8]"
            >
              <p>
                Hitech Industrial Insulation is the insulation specialist within HITECH GROUP,
                dedicated to protecting industrial assets from heat, cold and noise. We combine
                sound material knowledge with disciplined installation practices to deliver
                insulation that performs — on site and over time.
              </p>
              <p>
                Our scope covers thermal, cold, acoustic and industrial roofing solutions for
                process plants, piping systems, equipment and facilities. Every application is
                engineered around the client&rsquo;s operating conditions, expected temperatures
                and long-term maintenance goals.
              </p>
              <p>
                Quality, efficiency and safety guide everything we do — from material selection
                to site workmanship. The result is dependable insulation that reduces energy
                loss, protects personnel and extends the life of industrial systems.
              </p>
              <p>
                We build lasting customer relationships by delivering consistent results,
                respecting project schedules and standing behind the quality of our work.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
            >
              {[
                {
                  icon: Flame,
                  title: "Thermal Insulation",
                  description: "Reduces heat loss and maintains process temperatures.",
                },
                {
                  icon: Snowflake,
                  title: "Cold Insulation",
                  description: "Protects low-temperature and chilled systems.",
                },
                {
                  icon: Volume2,
                  title: "Acoustic Insulation",
                  description: "Controls industrial noise and improves comfort.",
                },
                {
                  icon: Building2,
                  title: "Industrial Roofing",
                  description: "Weatherproofing and thermal performance for facilities.",
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
              <p className="text-white leading-relaxed">
                Delivering reliable insulation solutions that improve efficiency, safety and
                long-term performance.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="bg-[#F8FAFC]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-24">
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
            Our Services
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
          >
            Complete Industrial Insulation Solutions
          </motion.h2>

          <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
            Our comprehensive insulation services improve operational efficiency, conserve
            energy and protect equipment across demanding industrial environments.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 gap-6 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {[
            {
              icon: Flame,
              title: "Thermal Insulation",
              description:
                "High-performance thermal insulation for piping, equipment and process systems — controlling heat loss, maintaining process temperatures and improving energy efficiency.",
            },
            {
              icon: Snowflake,
              title: "Cold Insulation",
              description:
                "Specialized insulation for chilled and low-temperature systems that prevents condensation, preserves cold and protects cryogenic and refrigeration applications.",
            },
            {
              icon: Volume2,
              title: "Acoustic Insulation",
              description:
                "Noise-control insulation that reduces industrial sound levels, protects personnel and creates quieter, safer and more comfortable working environments.",
            },
            {
              icon: Building2,
              title: "Roofing Insulation",
              description:
                "Industrial roofing and building insulation that provides weather protection, improves thermal comfort and lowers energy consumption across facilities.",
            },
            {
              icon: Vibrate,
              title: "Vibration Insulation",
              description:
                "Insulation and support systems that absorb vibration and movement, reducing mechanical stress, noise and wear on industrial equipment and structures.",
            },
            {
              icon: Factory,
              title: "Industrial Insulation Solutions",
              description:
                "Complete, engineered insulation programs covering material selection, supply, installation and maintenance for the full range of industrial requirements.",
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
          className="bg-[#0B2D5C] rounded-[24px] mt-16 px-8 py-14 text-center"
        >
          <h3 className="text-white text-2xl md:text-3xl font-extrabold leading-[1.2]">
            Custom Insulation Solutions for Every Industry
          </h3>
          <p className="text-[rgba(255,255,255,0.8)] leading-[1.8] mt-4 max-w-[760px] mx-auto">
            Every insulation solution is designed according to project requirements, operating
            conditions and industry standards — ensuring the right material, the right
            thickness and the right installation for your facility.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 h-14 px-9 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl hover:bg-[#d9a000] transition-colors mt-8"
          >
            Contact Our Team
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>

    <section className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-24">
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
            Products &amp; Materials
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
          >
            Premium Insulation Materials for Industrial Applications
          </motion.h2>

          <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
            Hitech Industrial Insulation uses high-quality insulation materials to ensure
            durability, thermal efficiency and long-term performance.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {[
            {
              name: "Rockwool",
              description: "Rigid mineral wool boards for high-temperature thermal insulation.",
              image: "/images/home/hitech-bd.png",
              alt: "Rockwool insulation material",
            },
            {
              name: "Glass Wool",
              description: "Lightweight fibrous insulation for thermal and acoustic control.",
              image: "/images/home/home-about-main.png",
              alt: "Glass wool insulation material",
            },
            {
              name: "Mineral Wool",
              description: "Versatile insulation for heat retention, fire resistance and noise control.",
              image: "/images/home/home-about-small.png",
              alt: "Mineral wool insulation material",
            },
            {
              name: "ArmaFlex",
              description: "Flexible elastomeric insulation for chilled and refrigeration systems.",
              image: "/images/home/ultrasonic-bd.png",
              alt: "ArmaFlex insulation material",
            },
            {
              name: "Aluminium Cladding Sheets",
              description: "Protective metal cladding that shields insulation from weather and damage.",
              image: "/images/home/precision-bd.png",
              alt: "Aluminium cladding sheets",
            },
            {
              name: "Cold Insulation Materials",
              description: "Specialized materials for condensation control and low-temperature protection.",
              image: "/images/about/hero-bg.png",
              alt: "Cold insulation materials",
            },
          ].map((product) => (
            <motion.div
              key={product.name}
              variants={itemVariants}
              className="group bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:border-[#F4B400] transition-all duration-300"
            >
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[#0B2D5C] text-lg">{product.name}</h3>
                <p className="text-sm text-[#334155] leading-[1.7] mt-2">{product.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#0B2D5C] rounded-[24px] mt-16 px-8 py-14 text-center"
        >
          <h3 className="text-white text-2xl md:text-3xl font-extrabold leading-[1.2]">
            Quality Materials. Reliable Performance.
          </h3>
          <p className="text-[rgba(255,255,255,0.8)] leading-[1.8] mt-4 max-w-[760px] mx-auto">
            Selecting the right insulation material is essential for energy efficiency,
            equipment protection and long-term operational reliability — which is why we work
            with proven, high-quality materials trusted across industrial applications.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="bg-[#F8FAFC]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-24">
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
            Industries We Serve
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
          >
            Trusted Insulation Solutions Across Diverse Industries
          </motion.h2>

          <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
            Hitech Industrial Insulation delivers customized insulation solutions for a wide
            range of industrial sectors, with a focus on safety, efficiency and long-term
            performance.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {[
            {
              icon: Bolt,
              title: "Power Plants",
              description: "Insulation for boilers, turbines and high-temperature systems.",
            },
            {
              icon: Factory,
              title: "Sugar Industry",
              description: "Thermal protection for evaporators, pipes and process equipment.",
            },
            {
              icon: FlaskConical,
              title: "Chemical Industry",
              description: "Heat and corrosion protection across chemical processing lines.",
            },
            {
              icon: Pill,
              title: "Pharmaceutical",
              description: "Clean, controlled insulation for sensitive production facilities.",
            },
            {
              icon: UtensilsCrossed,
              title: "Food Processing",
              description: "Hygienic insulation that maintains temperatures and safety.",
            },
            {
              icon: Layers,
              title: "Paper & Pulp",
              description: "Heat retention and process control for paper manufacturing.",
            },
            {
              icon: Hammer,
              title: "Cement",
              description: "High-temperature insulation for kilns and grinding systems.",
            },
            {
              icon: Cog,
              title: "Manufacturing",
              description: "Reliable insulation for general industrial production lines.",
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
          className="bg-[#0B2D5C] rounded-[24px] mt-16 px-8 py-14 text-center"
        >
          <h3 className="text-white text-2xl md:text-3xl font-extrabold leading-[1.2]">
            Tailored Insulation Solutions for Every Industry
          </h3>
          <p className="text-[rgba(255,255,255,0.8)] leading-[1.8] mt-4 max-w-[760px] mx-auto">
            Every industry has unique operational requirements. Hitech Industrial Insulation
            provides customized insulation systems designed to maximize efficiency and
            reliability for your specific application.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 h-14 px-9 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl hover:bg-[#d9a000] transition-colors mt-8"
          >
            Discuss Your Project
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
    </>
  )
}

export default IndustrialInsulation
