import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import heroBg from "@/assets/images/about/hero-bg.png"
import WhoWeAre from "../components/sections/WhoWeAre"
import OurJourney from "../components/sections/OurJourney"
import MissionVision from "../components/sections/MissionVision"
import CoreValues from "../components/sections/CoreValues"
import GroupCompanies from "../components/sections/GroupCompanies"
import Leadership from "../components/sections/Leadership"
import {
  Cog,
  BadgeCheck,
  Layers,
  Building2,
  Factory,
  Users,
  Globe,
} from "lucide-react"

const highlights = [
  {
    icon: Cog,
    title: "Industrial Expertise",
    description: "Specialized engineering knowledge across multiple industrial domains.",
  },
  {
    icon: BadgeCheck,
    title: "ISO 9001:2015 Quality Focus",
    description: "Structured quality management aligned with international standards.",
  },
  {
    icon: Layers,
    title: "Multi-Division Engineering Group",
    description: "Three specialized divisions operating under one trusted umbrella.",
  },
  {
    icon: Building2,
    title: "Trusted Across Multiple Industries",
    description: "Serving sugar, power, paper, chemical, food, and heavy engineering sectors.",
  },
]

const bottomStrip = [
  { icon: Factory, label: "Industrial Solutions" },
  { icon: BadgeCheck, label: "Certified Quality" },
  { icon: Users, label: "Expert Engineering Team" },
  { icon: Globe, label: "Pan-Industry Experience" },
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

function About() {
  return (
    <>
      <section className="relative bg-[#082A57] overflow-hidden min-h-[100dvh] flex flex-col">
  <div className="absolute inset-0">
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    />
    <div className="absolute inset-0 bg-[rgba(8,42,87,0.68)]" />
  </div>

      <div className="relative z-10 flex-1 mx-auto max-w-[1280px] w-full px-5 md:px-8 flex flex-col justify-center pt-8 pb-6 lg:pt-5 lg:pb-20">
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
              About Hitech Group
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-white text-[38px] leading-[1.1] lg:text-[64px] lg:leading-[1.05] font-extrabold max-w-[700px] mt-3 mx-auto lg:mx-0"
            >
              Engineering Excellence. Trusted Industrial Solutions.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-[rgba(255,255,255,0.85)] text-lg lg:text-xl leading-[1.7] max-w-[580px] mt-5 mx-auto lg:mx-0"
            >
              HITECH GROUP is a trusted industrial solutions provider with proven expertise in
              insulation, ultrasonic inspection, and precision engineering services. Our
              multi-division structure enables us to deliver dependable, engineering-driven
              solutions to industries across India.
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
                Contact Us
              </Link>
            </motion.div>
          </div>

          <motion.div
            variants={cardVariants}
            className="max-lg:mt-8"
          >
            <div className="bg-white/90 backdrop-blur-md rounded-[24px] shadow-2xl p-8 max-w-[480px] mx-auto lg:mx-0 lg:ml-auto">
              <h3 className="text-lg font-bold text-[#0B2D5C] mb-6">Why HITECH GROUP</h3>
              <div className="space-y-5">
                {highlights.map((item) => {
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

      <div className="relative z-10 bg-black/30 backdrop-blur-sm">
    <div className="max-w-[1280px] mx-auto px-5 md:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-6 py-4">
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

      <WhoWeAre />
      <OurJourney />
      <MissionVision />
      <CoreValues />
      <GroupCompanies />
      <Leadership />
    </>
  )
}

export default About
