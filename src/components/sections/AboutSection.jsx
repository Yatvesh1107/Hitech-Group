import { motion } from "framer-motion"
import { Award, BadgeCheck, Users, Target, Check } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Engineering Excellence",
    description: "Delivering precision-driven engineering solutions across diverse industrial sectors.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Assurance",
    description: "Rigorous quality control and compliance with industry standards and regulations.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    description: "Skilled professionals with deep domain expertise and technical knowledge.",
  },
  {
    icon: Target,
    title: "Customer Focus",
    description: "Tailored solutions built around each client's unique operational requirements.",
  },
]

const partnerHighlights = [
  "Engineering Solutions",
  "Reliable Service",
  "Industry Expertise",
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

function AboutSection() {
  return (
    <section className="bg-white relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #0B2D5C 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.035,
        }}
      />

      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-15 md:py-[50px]">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 xl:gap-24 items-center">
          {/* ── Left: Images ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-[28px] overflow-hidden shadow-[0_20px_50px_-12px_rgba(11,45,92,0.15)]">
              <img
                src="/images/home/home-about-main.png"
                alt="HITECH industrial facility"
                className="w-full h-[400px] md:h-[480px] lg:h-[520px] object-cover"
              />
              {/* Soft gradient overlay at bottom for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2D5C]/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating secondary image */}
            <div className="absolute -bottom-5 -right-3 md:-right-6 w-[150px] md:w-[190px] rounded-[20px] overflow-hidden shadow-[0_12px_30px_-8px_rgba(11,45,92,0.25)] border-[5px] border-white">
              <img
                src="/images/home/home-about-small.png"
                alt="Engineering operations"
                className="w-full h-[105px] md:h-[130px] object-cover"
              />
            </div>

            {/* Accent bar */}
            <div className="absolute -bottom-2 left-6 md:left-10 w-20 h-[3px] bg-[#F4B400] rounded-full" />
          </motion.div>

          {/* ── Right: Content ── */}
          <motion.div
            className="space-y-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Heading block */}
            <div className="space-y-3.5">
              <motion.span
                variants={itemVariants}
                className="inline-flex items-center gap-2 text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
              >
                <span className="w-6 h-[2px] bg-[#F4B400] rounded-full" />
                About Hitech
              </motion.span>

              <motion.h2
                variants={itemVariants}
                className="text-[#0B2D5C] text-[32px] md:text-[38px] lg:text-[48px] font-extrabold leading-[1.15] tracking-tight"
              >
                Delivering Industrial Engineering Solutions with Quality, Innovation &amp; Reliability
              </motion.h2>
            </div>

            {/* Body copy */}
            <motion.div
              variants={itemVariants}
              className="space-y-3.5 text-[#334155] leading-[1.8] text-[15.5px]"
            >
              <p>
                HITECH GROUP is a multi-disciplinary industrial engineering group delivering
                specialized solutions across insulation, non-destructive testing, and precision
                engineering. With a strong operational presence in Kolhapur, Maharashtra, the group
                serves a diverse range of industries including manufacturing, energy, infrastructure,
                and process industries.
              </p>
              <p>
                Each division operates with its own technical expertise, allowing HITECH to offer
                deep specialization while leveraging shared resources, quality standards, and
                engineering best practices across the organization.
              </p>
              <p>
                The group is built on a foundation of technical competence, operational integrity,
                and a commitment to delivering measurable value. By combining domain expertise with
                a client-first approach, HITECH has established long-term partnerships across the
                industrial sector.
              </p>
            </motion.div>

            {/* Feature cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
            >
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className="group bg-white border border-gray-100 rounded-2xl p-4.5 hover:-translate-y-1 hover:border-[#F4B400]/60 hover:shadow-[0_8px_24px_-8px_rgba(244,180,0,0.18)] transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#F4B400]/10 flex items-center justify-center mb-2.5 group-hover:bg-[#F4B400]/15 transition-colors">
                      <Icon size={18} className="text-[#F4B400]" />
                    </div>
                    <h4 className="font-semibold text-[#0F172A] text-[15px] leading-snug">
                      {feature.title}
                    </h4>
                    <p className="text-[13px] text-[#334155] mt-1 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </motion.div>

            {/* CTA + Partner card */}
            <motion.div variants={itemVariants} className="space-y-5">
              <a
                href="/about"
                className="inline-flex h-13 px-7 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl items-center justify-center hover:bg-[#d9a000] transition-colors shadow-[0_4px_14px_-4px_rgba(244,180,0,0.45)]"
              >
                Learn More
              </a>

              {/* Trusted partner card */}
              <div className="relative bg-white border border-gray-100 rounded-2xl p-5 shadow-[0_4px_20px_-8px_rgba(11,45,92,0.08)]">
                <div className="absolute top-0 left-5 w-10 h-[3px] bg-[#F4B400] rounded-b-full" />
                <h4 className="font-bold text-[#0B2D5C] text-[15px]">
                  Trusted Industrial Partner
                </h4>
                <p className="text-[13.5px] text-[#334155] mt-1.5 leading-relaxed">
                  HITECH GROUP is committed to being a reliable partner for industrial engineering
                  needs, combining technical expertise with a commitment to quality and timely
                  delivery.
                </p>
                <div className="mt-3.5 flex flex-wrap gap-x-5 gap-y-2">
                  {partnerHighlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-1.5 text-[13px] text-[#334155]"
                    >
                      <Check size={14} className="text-[#F4B400] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection


// import { motion } from "framer-motion"
// import { Award, BadgeCheck, Users, Target, Check } from "lucide-react"

// const features = [
//   {
//     icon: Award,
//     title: "Engineering Excellence",
//     description: "Delivering precision-driven engineering solutions across diverse industrial sectors.",
//   },
//   {
//     icon: BadgeCheck,
//     title: "Quality Assurance",
//     description: "Rigorous quality control and compliance with industry standards and regulations.",
//   },
//   {
//     icon: Users,
//     title: "Experienced Team",
//     description: "Skilled professionals with deep domain expertise and technical knowledge.",
//   },
//   {
//     icon: Target,
//     title: "Customer Focus",
//     description: "Tailored solutions built around each client's unique operational requirements.",
//   },
// ]

// const partnerHighlights = [
//   "Engineering Solutions",
//   "Reliable Service",
//   "Industry Expertise",
// ]

// const containerVariants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.12 } },
// }

// const itemVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
// }

// function AboutSection() {
//   return (
//     <section className="bg-white relative overflow-hidden">
//       <div
//         className="absolute inset-0 pointer-events-none"
//         style={{
//           backgroundImage: "radial-gradient(circle, #0B2D5C 1px, transparent 1px)",
//           backgroundSize: "40px 40px",
//           opacity: 0.04,
//         }}
//       />

//       <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-16 lg:py-20">
//         <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.7, ease: "easeOut" }}
//           >
//             <div className="relative">
//               <div className="rounded-[24px] overflow-hidden">
//                 <img
//                   src="/images/home/home-about-main.png"
//                   alt="HITECH industrial facility"
//                   className="w-full h-[420px] md:h-[500px] object-cover"
//                 />
//               </div>

//               <div className="absolute -top-4 -right-4 rounded-[20px] overflow-hidden shadow-lg w-[160px] md:w-[200px]">
//                 <img
//                   src="/images/home/home-about-small.png"
//                   alt="Engineering operations"
//                   className="w-full h-[110px] md:h-[140px] object-cover"
//                 />
//               </div>

//               <div className="absolute -bottom-6 left-8 w-16 h-[3px] bg-[#F4B400] rounded-full" />
//             </div>
//           </motion.div>

//           <motion.div
//             className="space-y-6"
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//           >
//             <div className="space-y-4">
//               <motion.span
//                 variants={itemVariants}
//                 className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
//               >
//                 About Hitech
//               </motion.span>

//               <motion.h2
//                 variants={itemVariants}
//                 className="text-[#0B2D5C] text-[34px] md:text-[40px] lg:text-[52px] font-extrabold leading-[1.1]"
//               >
//                 Delivering Industrial Engineering Solutions with Quality, Innovation &amp; Reliability
//               </motion.h2>
//             </div>

//             <motion.div variants={itemVariants} className="space-y-4 text-[#334155] leading-[1.8]">
//               <p>
//                 HITECH GROUP is a multi-disciplinary industrial engineering group delivering
//                 specialized solutions across insulation, non-destructive testing, and precision
//                 engineering. With a strong operational presence in Kolhapur, Maharashtra, the group
//                 serves a diverse range of industries including manufacturing, energy, infrastructure,
//                 and process industries.
//               </p>
//               <p>
//                 Each division operates with its own technical expertise, allowing HITECH to offer
//                 deep specialization while leveraging shared resources, quality standards, and
//                 engineering best practices across the organization.
//               </p>
//               <p>
//                 The group is built on a foundation of technical competence, operational integrity,
//                 and a commitment to delivering measurable value. By combining domain expertise with
//                 a client-first approach, HITECH has established long-term partnerships across the
//                 industrial sector.
//               </p>
//             </motion.div>

//             <motion.div
//               variants={itemVariants}
//               className="grid grid-cols-1 sm:grid-cols-2 gap-4"
//             >
//               {features.map((feature) => {
//                 const Icon = feature.icon
//                 return (
//                   <div
//                     key={feature.title}
//                     className="bg-white border border-gray-100 rounded-[18px] p-5 hover:-translate-y-1 hover:border-[#F4B400] transition-all duration-300"
//                   >
//                     <div className="w-10 h-10 rounded-lg bg-[#F4B400]/10 flex items-center justify-center mb-3">
//                       <Icon size={20} className="text-[#F4B400]" />
//                     </div>
//                     <h4 className="font-semibold text-[#0F172A]">{feature.title}</h4>
//                     <p className="text-sm text-[#334155] mt-1">{feature.description}</p>
//                   </div>
//                 )
//               })}
//             </motion.div>

//             <motion.div variants={itemVariants}>
//               <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
//                 <a
//                   href="/about"
//                   className="h-14 px-8 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl inline-flex items-center justify-center hover:bg-[#d9a000] transition-colors"
//                 >
//                   Learn More
//                 </a>
//               </div>
//             </motion.div>

//             <motion.div
//               variants={itemVariants}
//               className="bg-white border border-gray-100 rounded-2xl shadow-md p-6"
//             >
//               <h4 className="font-bold text-[#0B2D5C]">Trusted Industrial Partner</h4>
//               <p className="text-sm text-[#334155] mt-2 leading-relaxed">
//                 HITECH GROUP is committed to being a reliable partner for industrial engineering
//                 needs, combining technical expertise with a commitment to quality and timely
//                 delivery.
//               </p>
//               <div className="mt-4 space-y-2">
//                 {partnerHighlights.map((item) => (
//                   <div key={item} className="flex items-center gap-2 text-sm text-[#334155]">
//                     <Check size={16} className="text-[#F4B400] shrink-0" />
//                     <span>{item}</span>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default AboutSection
