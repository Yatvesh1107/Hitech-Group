import { motion } from "framer-motion"
import { Briefcase, GraduationCap, Users, Award, BadgeCheck } from "lucide-react"
import rdpatil from "@/assets/images/about/rdpatil.jpeg"
import ajinkya from "@/assets/images/about/ajinkyapatil.jpeg"

const leaders = [
  {
    name: "Mr. Raghunath Patil",
    role: "CEO",
    company: "Hitech Industrial Insulation",
    image: rdpatil,
    imageAlt: "Portrait placeholder – Mr. Raghunath Patil",
    credentials: "DME, BE(Mech) – UT Level 3",
    bio: "With a strong engineering vision and a hands-on understanding of industrial processes, Mr. Raghunath Patil leads HITECH GROUP with an unwavering commitment to quality, dependable customer relationships and industrial excellence across every division.",
    chips: [
      "Engineering Leadership",
      "DME, BE(Mech)",
      "UT Level 3 Certified",
      "Industrial Insulation",
    ],
  },
  {
    name: "Mr. Ajinkya Patil",
    role: "Director",
    company: "Hitech Industrial Insulation",
    image: ajinkya,
    imageAlt: "Portrait placeholder – Mr. Ajinkya Patil",
    credentials: "DME, BE(Mech) – UT Level 3",
    bio: "Mr. Ajinkya Patil directs the group's business growth and future development, championing innovation, operational excellence and the long-term evolution of HITECH GROUP's capabilities and client partnerships.",
    chips: [
      "Operations & Growth",
      "DME, BE(Mech)",
      "UT Level 3 Certified",
      "Industrial Insulation",
    ],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

function Leadership() {
  return (
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
            variants={cardVariants}
            className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
          >
            Our Leadership
          </motion.span>

          <motion.h2
            variants={cardVariants}
            className="text-[#0B2D5C] text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] mt-3"
          >
            Leadership Built on Vision, Quality &amp; Trust
          </motion.h2>

          <motion.p variants={cardVariants} className="text-[#334155] leading-[1.8] mt-4">
            The leadership team is the driving force behind HITECH GROUP&rsquo;s commitment to
            engineering excellence, customer satisfaction and continuous growth.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 mt-8"
          // className="grid md:grid-cols-2 gap-6 max-w-[1000px] mx-auto mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {leaders.map((leader) => (
            <motion.div
              key={leader.name}
              variants={cardVariants}
              className="group bg-white rounded-[24px] border border-gray-100 shadow-xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:border-[#F4B400] transition-all duration-400"
            >
              <div className="relative h-[320px] md:h-[360px] overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.imageAlt}
                  className="w-full h-full object group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-7">
                  <p className="text-white font-bold text-2xl">{leader.name}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="inline-flex items-center gap-1.5 text-[#F4B400] text-sm font-semibold">
                      <Briefcase size={15} />
                      {leader.role}
                    </span>
                    <span className="w-1 h-1 bg-[#F4B400] rounded-full" />
                    <span className="text-[rgba(255,255,255,0.85)] text-sm">{leader.company}</span>
                  </div>
                </div>
              </div>

              <div className="p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-[#0B2D5C]/5 text-[#0B2D5C] font-medium text-xs rounded-full px-3 py-1.5">
                    <GraduationCap size={12} className="text-[#F4B400]" />
                    {leader.credentials}
                  </span>
                </div>

                <p className="text-[#334155] leading-[1.8] mt-4">{leader.bio}</p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {leader.chips.map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center gap-1.5 bg-[#F4B400]/10 text-[#0B2D5C] font-medium text-xs rounded-full px-3 py-1.5"
                    >
                      <Award size={12} className="text-[#F4B400]" />
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative bg-[#0B2D5C] rounded-[24px] mt-10 text-center px-8 py-14 overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23F4B400' stroke-width='1'%3E%3Cpath d='M24 0L48 24L24 48L0 24Z'/%3E%3Ccircle cx='24' cy='24' r='4'/%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
          <p className="relative z-10 text-white text-xl md:text-2xl font-semibold leading-relaxed max-w-[780px] mx-auto">
            Leading HITECH GROUP with Engineering Excellence, Innovation &amp; Customer Trust.
          </p>
          <div className="relative z-10 flex items-center justify-center gap-2 mt-5">
            <Users size={18} className="text-[#F4B400]" />
            <BadgeCheck size={18} className="text-[#F4B400]" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Leadership
