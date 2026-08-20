import alum from "@/assets/images/precisionproducts/aluminium.jpeg"
import fabstruct from "@/assets/images/precisionproducts/fabstruct.jpeg"
import heavyfab from "@/assets/images/precisionproducts/heavyfab.jpeg"
import machinejob from "@/assets/images/precisionproducts/Machinejob.jpeg"
import stainless from "@/assets/images/precisionproducts/stainless.jpeg"
import weldedmold from "@/assets/images/precisionproducts/weldedmold.jpeg"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Waves,
  Check,
  ArrowRight,
  Layers,
  Building2,
  ShieldCheck,
  Factory,
  Cog,
  Wrench,
  Clock3,
  Globe,
  Users,
  Cpu,
  Gauge,
  BadgeCheck,
} from "lucide-react"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const productStats = [
  { icon: Clock3, label: "Since 1962" },
  { icon: Globe, label: "74+ Countries" },
  { icon: Users, label: "1000+ Machines" },
  { icon: Cpu, label: "High-Amplitude Resonance" },
]

const technicalSteps = [
  {
    step: "01",
    title: "Low-Frequency Vibrations",
    description:
      "Low frequency vibrations (at resonance frequency) are used as a carrier to deliver high amplitude energy to a metal fabrication or machined part.",
  },
  {
    step: "02",
    title: "Load on Existing Stress Patterns",
    description:
      "The high amplitude vibrations produce a load that is superimposed on the existing stress patterns, resulting in a reduction of peak residual stresses.",
  },
  {
    step: "03",
    title: "Dimensionally Stable Product",
    description:
      "This produces a more dimensionally stable product and reduces the random distortion that often occurs in unstable work pieces.",
  },
]

const uses = [
  {
    title: "Wide Range of Metals",
    description:
      "The process of Formula 62 Vibratory Stress Relieving can be used on a wide range of ferrous and non-ferrous metals.",
  },
  {
    title: "Diverse Materials",
    description:
      "Treat materials like carbon steels, stainless steel, aluminum, cast iron, manganese, inconel and more.",
  },
  {
    title: "Industrial Applications",
    description:
      "Used by industries into fabrications, weld repairing, machine tool building, castings, mold making, gears, shafts and pinions.",
  },
]

const services = [
  { icon: Factory, title: "Heavy Fabrications" },
  { icon: Building2, title: "Fabricated Structures" },
  { icon: Wrench, title: "Weld Repaired Jobs" },
  { icon: Layers, title: "Castings" },
  { icon: ShieldCheck, title: "Stainless Steel" },
  { icon: Cog, title: "Aluminium" },
  { icon: Gauge, title: "Machined Components" },
]

const industries = [
  "Aerospace",
  "Automotive",
  "Casting",
  "Cement",
  "Defense",
  "Mining",
  "Mold Making",
  "Power Generation",
  "Railways",
  "Ship Building",
  "Sugar",
  "Welding & Fabricators",
  "Machine Building & Machining",
]

const products = [
  { name: "Aluminium", image: alum },
  { name: "Fabricated Structures", image: fabstruct },
  { name: "Stainless Steel", image: stainless },
  { name: "Welded Mold", image: weldedmold },
  { name: "Heavy Fabrications", image: heavyfab },
  { name: "Machined Job (Casting)", image: machinejob },
]

function PrecisionTechProducts() {
  return (
    <>
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
              Formula 62 Vibratory Stress Relieving
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
            >
              Vibratory Stress Relieving Services
            </motion.h2>

            <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
              Formula 62 Vibratory Stress Relieving Machines are widely used, since 1962, in
              more than 74 countries, with over 1000 machines working for diverse
              applications in different climatic conditions — delivering sustained quality,
              ruggedness, durability and maintenance-free operation at high amplitude
              resonance frequency to effectively reduce peak residual stresses in metal
              fabrications, castings and machined components.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {productStats.map((stat) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="bg-[#F8FAFC] border border-gray-100 rounded-[20px] p-5 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#F4B400]/10 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[#F4B400]" />
                  </div>
                  <span className="text-sm font-semibold text-[#0B2D5C] leading-snug">
                    {stat.label}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>
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
              Technical Process
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
            >
              How Vibratory Stress Relieving Works
            </motion.h2>

            <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
              Controlled high-amplitude vibrations reduce peak residual stresses in metal
              fabrications, castings and machined components, producing dimensionally stable
              products.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {technicalSteps.map((step) => (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="relative bg-white rounded-[24px] border border-gray-100 shadow-sm p-7 hover:-translate-y-1 hover:shadow-xl hover:border-[#F4B400] transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#F4B400] rounded-t-[24px] opacity-80" />
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-xl bg-[#F4B400]/10 flex items-center justify-center">
                    <Waves size={26} className="text-[#F4B400]" />
                  </div>
                  <span className="text-3xl font-extrabold text-[#F4B400]/25">{step.step}</span>
                </div>
                <h3 className="font-bold text-[#0B2D5C] text-lg mt-5">{step.title}</h3>
                <p className="text-sm text-[#334155] leading-[1.7] mt-2">{step.description}</p>
              </motion.div>
            ))}
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
              Uses
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
            >
              Where Vibratory Stress Relieving Is Applied
            </motion.h2>

            <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
              The process of Formula 62 Vibratory Stress Relieving can be used on a wide
              range of ferrous and non-ferrous metals across many manufacturing disciplines.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {uses.map((use) => (
              <motion.div
                key={use.title}
                variants={itemVariants}
                className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-7 hover:-translate-y-1 hover:shadow-xl hover:border-[#F4B400] transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#F4B400]/10 flex items-center justify-center">
                  <Check size={26} className="text-[#F4B400]" />
                </div>
                <h3 className="font-bold text-[#0B2D5C] text-lg mt-5">{use.title}</h3>
                <p className="text-sm text-[#334155] leading-[1.7] mt-2">{use.description}</p>
              </motion.div>
            ))}
          </motion.div>
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
              On-Site Services
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
            >
              On-Site Vibratory Stress Relieving Across India
            </motion.h2>

            <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
              Our on-site Vibratory Stress Relieving, using Formula 62 Equipment from the
              USA, is available anywhere in India for a wide range of components.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {services.map((service) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-7 hover:-translate-y-1 hover:shadow-xl hover:border-[#F4B400] transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#F4B400]/10 flex items-center justify-center">
                    <Icon size={26} className="text-[#F4B400]" />
                  </div>
                  <h3 className="font-bold text-[#0B2D5C] text-lg mt-5">{service.title}</h3>
                  <p className="text-sm text-[#334155] leading-[1.7] mt-2">
                    Available on-site for dimensional stability and residual stress control.
                  </p>
                </motion.div>
              )
            })}

            <motion.div
              variants={itemVariants}
              className="bg-[#0B2D5C] rounded-[24px] p-7 flex flex-col justify-center"
            >
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                <BadgeCheck size={26} className="text-[#F4B400]" />
              </div>
              <h3 className="font-bold text-white text-lg mt-5">Anywhere in India</h3>
              <p className="text-[rgba(255,255,255,0.8)] text-sm leading-[1.7] mt-2">
                Equipment can be mobilized to your plant or fabrication facility for
                treatment at the component location.
              </p>
            </motion.div>
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
              Industries
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
            >
              Useful Across a Wide Range of Industries
            </motion.h2>

            <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
              Formula 62 Vibratory Stress Relieving technology is useful in industries like:
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {industries.map((industry) => (
              <motion.span
                key={industry}
                variants={itemVariants}
                className="inline-flex items-center gap-2 bg-white text-[#0B2D5C] text-sm font-semibold rounded-full border border-gray-200 px-5 py-2.5 hover:border-[#F4B400] hover:bg-[#F4B400]/5 transition-colors"
              >
                <Check size={14} className="text-[#F4B400]" />
                {industry}
              </motion.span>
            ))}
          </motion.div>
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
              Product Gallery
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
            >
              Applications We Treat
            </motion.h2>

            <motion.p variants={itemVariants} className="text-[#334155] leading-[1.8] mt-4">
              A range of components and fabrications treated through vibratory stress
              relieving services.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {products.map((product) => (
              <motion.div
                key={product.name}
                variants={itemVariants}
                className="group bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:border-[#F4B400] transition-all duration-300"
              >
                <div className="relative h-[200px] overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#F1F5F9]">
                      <Layers className="w-10 h-10 text-[#94A3B8]" />
                      <span className="text-sm font-semibold text-[#94A3B8] tracking-wide uppercase">
                        Image Coming Soon
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[#0B2D5C] text-lg">{product.name}</h3>
                  <p className="text-sm text-[#334155] leading-[1.7] mt-2">
                    Vibratory stress relieving applied to {product.name.toLowerCase()} for
                    residual stress control and dimensional stability.
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#0B2D5C]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-14 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
          >
            <div>
              <h2 className="text-white text-2xl md:text-3xl font-extrabold leading-[1.2]">
                Ready to Stabilize Your Components?
              </h2>
              <p className="text-[rgba(255,255,255,0.8)] leading-[1.8] mt-3 max-w-[680px]">
                Get in touch with our team to discuss vibratory stress relieving for your
                fabrications, castings and machined components — available on-site anywhere
                in India.
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 h-14 px-9 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl hover:bg-[#d9a000] transition-colors shrink-0"
            >
              Get a Quote
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default PrecisionTechProducts