import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Mouse,
  Thermometer,
  Search,
  Settings,
  Award,
  Factory,
  BadgeCheck,
  MapPin,
} from "lucide-react"
import heroBg from "@/assets/images/home/hero-bg.png"

const expertise = [
  {
    icon: Thermometer,
    title: "Industrial Insulation",
    description: "Thermal and acoustic insulation for industrial piping, vessels, and equipment.",
  },
  {
    icon: Search,
    title: "Experts in Ultrasonics",
    description: "Advanced NDT, thickness gauging, and ultrasonic testing services.",
  },
  {
    icon: Settings,
    title: "Precision Tech Engineering",
    description: "Precision engineering solutions and technical consultancy for complex projects.",
  },
]

const highlights = [
  { icon: Award, label: "Engineering Excellence" },
  { icon: Factory, label: "Industrial Solutions" },
  { icon: BadgeCheck, label: "Certified Quality" },
  { icon: MapPin, label: "Nationwide Support" },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.25, ease: "easeOut" } },
}

function Hero() {
  return (
    <section className="relative min-h-screen lg:h-screen bg-[#082A57] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-[rgba(8,42,87,0.75)]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8 min-h-screen lg:h-full flex flex-col justify-center pt-12 pb-28 sm:pt-28 sm:pb-32 lg:pt-[25px] lg:pb-[120px]">
        <motion.div
          className="grid w-full lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-14 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left content */}
          <div className="text-center lg:text-left order-1">
            <motion.span
              variants={itemVariants}
              className="inline-block text-[#F4B400] text-[11px] sm:text-xs md:text-sm font-semibold tracking-[1.5px] sm:tracking-[2px] uppercase"
            >
              Industrial Solutions for Modern Industries
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-white text-[28px] leading-[1.2] sm:text-[36px] md:text-[42px] lg:text-[48px] xl:text-[56px] lg:leading-[1.1] font-extrabold max-w-[600px] mt-3 sm:mt-4 mx-auto lg:mx-0"
            >
              Engineering Industrial Excellence Through{" "}
              <span className="text-[#F4B400]">Specialized Solutions</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-white/85 text-[15px] sm:text-base md:text-lg leading-relaxed max-w-[520px] mt-4 sm:mt-5 mx-auto lg:mx-0"
            >
              HITECH GROUP delivers comprehensive industrial insulation, non-destructive testing,
              and precision engineering solutions across India&apos;s leading manufacturing and
              infrastructure sectors.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-7 sm:mt-8 justify-center lg:justify-start"
            >
              <Link
                to="/divisions"
                className="h-12 sm:h-[52px] px-6 sm:px-8 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl inline-flex items-center justify-center hover:bg-[#d9a000] transition-colors text-sm sm:text-base"
              >
                Explore Our Divisions
              </Link>
              <Link
                to="/contact"
                className="h-12 sm:h-[52px] px-6 sm:px-8 border-2 border-white text-white font-semibold rounded-xl inline-flex items-center justify-center hover:bg-white/10 transition-colors text-sm sm:text-base"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>

          {/* Expertise card */}
          <motion.div variants={cardVariants} className="order-2 w-full max-w-[440px] mx-auto lg:mx-0 lg:ml-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-6 md:p-7">
              <h3 className="text-[15px] sm:text-base font-bold text-[#0B2D5C] mb-4 sm:mb-5">
                Our Expertise
              </h3>
              <div className="space-y-4 sm:space-y-5">
                {expertise.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="flex gap-3 sm:gap-3.5">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#F4B400]/10 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-[#F4B400] sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-[#0F172A] text-sm sm:text-[15px]">
                          {item.title}
                        </h4>
                        <p className="text-xs sm:text-[13px] text-[#334155] mt-0.5 leading-snug">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom highlights bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/35 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2.5 gap-x-4 py-3.5 sm:py-4">
            {highlights.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2 sm:gap-2.5 text-white/80"
                >
                  <Icon size={15} className="text-[#F4B400] shrink-0 sm:w-4 sm:h-4" />
                  <span className="text-[11px] sm:text-xs md:text-sm font-medium leading-tight">
                    {item.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Scroll indicator – desktop only */}
      <motion.div
        className="absolute bottom-[62px] left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-white/40 hidden lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <Mouse size={16} />
        </motion.div>
        <span className="text-[9px] tracking-[2.5px] uppercase">Scroll</span>
      </motion.div>
    </section>
  )
}

export default Hero

// import { Link } from "react-router-dom"
// import { motion } from "framer-motion"
// import {
//   Mouse,
//   Thermometer,
//   Search,
//   Settings,
//   Award,
//   Factory,
//   BadgeCheck,
//   MapPin,
// } from "lucide-react"

// const expertise = [
//   {
//     icon: Thermometer,
//     title: "Industrial Insulation",
//     description: "Thermal and acoustic insulation for industrial piping, vessels, and equipment.",
//   },
//   {
//     icon: Search,
//     title: "Experts in Ultrasonics",
//     description: "Advanced NDT, thickness gauging, and ultrasonic testing services.",
//   },
//   {
//     icon: Settings,
//     title: "Precision Tech Engineering",
//     description: "Precision engineering solutions and technical consultancy for complex projects.",
//   },
// ]

// const highlights = [
//   { icon: Award, label: "Engineering Excellence" },
//   { icon: Factory, label: "Industrial Solutions" },
//   { icon: BadgeCheck, label: "Certified Quality" },
//   { icon: MapPin, label: "Nationwide Support" },
// ]

// const containerVariants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.15 } },
// }

// const itemVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
// }

// const cardVariants = {
//   hidden: { opacity: 0, x: 40 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.4, ease: "easeOut" } },
// }

// function Hero() {
//   return (
//     <section className="relative min-h-screen bg-[#082A57] overflow-hidden">
//       <div className="absolute inset-0">
//         <div
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{
//             backgroundImage:
//               "url('/images/home/hero-bg.png')",
//           }}
//         />
//         <div className="absolute inset-0 bg-[rgba(8,42,87,0.72)]" />
//       </div>

//       <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8 min-h-screen flex flex-col justify-center pt-[84px] pb-[160px]">
//         <motion.div
//           className="grid w-full lg:grid-cols-2 gap-12 items-center"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <div className="text-center lg:text-left">
//             <motion.span
//               variants={itemVariants}
//               className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
//             >
//               Industrial Solutions for Modern Industries
//             </motion.span>

//             <motion.h1
//               variants={itemVariants}
//               className="text-white text-[40px] leading-[1.1] lg:text-[72px] lg:leading-[1.05] font-extrabold max-w-[650px] mt-4 mx-auto lg:mx-0"
//             >
//               Engineering Industrial Excellence Through{" "}
//               <span className="text-[#F4B400]">Specialized Solutions</span>
//             </motion.h1>

//             <motion.p
//               variants={itemVariants}
//               className="text-[rgba(255,255,255,0.85)] text-lg lg:text-xl leading-[1.7] max-w-[580px] mt-6 mx-auto lg:mx-0"
//             >
//               HITECH GROUP delivers comprehensive industrial insulation, non-destructive testing,
//               and precision engineering solutions across India&apos;s leading manufacturing and
//               infrastructure sectors.
//             </motion.p>

//             <motion.div
//               variants={itemVariants}
//               className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start"
//             >
//               <Link
//                 to="/divisions"
//                 className="h-14 px-8 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl inline-flex items-center justify-center hover:bg-[#d9a000] transition-colors"
//               >
//                 Explore Our Divisions
//               </Link>
//               <Link
//                 to="/contact"
//                 className="h-14 px-8 border-2 border-white text-white font-semibold rounded-xl inline-flex items-center justify-center hover:bg-white/10 transition-colors"
//               >
//                 Contact Us
//               </Link>
//             </motion.div>
//           </div>

//           <motion.div
//             variants={cardVariants}
//             className="max-lg:mt-8"
//           >
//             <div className="bg-white rounded-[24px] shadow-2xl p-8 max-w-[480px] mx-auto lg:mx-0 lg:ml-auto">
//               <h3 className="text-lg font-bold text-[#0B2D5C] mb-6">Our Expertise</h3>
//               <div className="space-y-6">
//                 {expertise.map((item) => {
//                   const Icon = item.icon
//                   return (
//                     <div key={item.title} className="flex gap-4">
//                       <div className="w-10 h-10 rounded-lg bg-[#F4B400]/10 flex items-center justify-center shrink-0">
//                         <Icon size={20} className="text-[#F4B400]" />
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-[#0F172A]">{item.title}</h4>
//                         <p className="text-sm text-[#334155] mt-0.5">{item.description}</p>
//                       </div>
//                     </div>
//                   )
//                 })}
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>

//       <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm">
//         <div className="max-w-[1280px] mx-auto px-5 md:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-6 py-5">
//             {highlights.map((item) => {
//               const Icon = item.icon
//               return (
//                 <div key={item.label} className="flex items-center gap-3 text-white/80">
//                   <Icon size={18} className="text-[#F4B400] shrink-0" />
//                   <span className="text-sm font-medium">{item.label}</span>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>

//       <motion.div
//         className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.2, duration: 0.8 }}
//       >
//         <motion.div
//           animate={{ y: [0, 6, 0] }}
//           transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
//         >
//           <Mouse size={20} />
//         </motion.div>
//         <span className="text-[10px] tracking-[3px] uppercase">Scroll</span>
//       </motion.div>
//     </section>
//   )
// }

// export default Hero
