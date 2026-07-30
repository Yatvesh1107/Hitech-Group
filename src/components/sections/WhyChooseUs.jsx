import { motion } from "framer-motion"
import {
  Settings,
  BadgeCheck,
  ShieldCheck,
  Clock3,
  Handshake,
  Lightbulb,
} from "lucide-react"

const trustCards = [
  {
    icon: Settings,
    title: "Engineering Expertise",
    description:
      "Deep technical knowledge across insulation, NDT, and precision engineering disciplines.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Assurance",
    description:
      "Rigorous quality standards and adherence to industry regulations on every project.",
  },
  {
    icon: ShieldCheck,
    title: "Safety First",
    description:
      "Strict safety protocols to protect personnel, assets, and operational environments.",
  },
  {
    icon: Clock3,
    title: "Reliable Delivery",
    description:
      "Consistent on-time project execution with efficient planning and resource management.",
  },
  {
    icon: Handshake,
    title: "Customer-Centric",
    description:
      "Tailored solutions and responsive support built around each client's specific needs.",
  },
  {
    icon: Lightbulb,
    title: "Innovative Solutions",
    description:
      "Continuous adoption of modern techniques and technologies to solve complex challenges.",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

function WhyChooseUs() {
  return (
    <section className="bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #0B2D5C 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.04,
        }}
      />

      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-[120px]">
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase"
          >
            Why Choose Hitech
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#0B2D5C] text-[34px] md:text-[42px] lg:text-[56px] font-extrabold leading-[1.1] mt-4"
          >
            Engineering Excellence Built on Trust, Quality &amp; Reliability
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#334155] text-lg leading-[1.7] mt-6"
          >
            HITECH GROUP is committed to delivering industrial engineering solutions that meet the
            highest standards of quality, safety, and reliability. Our approach is built on
            technical expertise, operational integrity, and a deep understanding of our
            clients&apos; needs.
          </motion.p>
        </div>

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
                  src="https://images.unsplash.com/photo-1581092787765-e3feb951d987?auto=format&fit=crop&w=800&q=80"
                  alt="HITECH industrial operations"
                  className="w-full h-[500px] md:h-[600px] object-cover"
                />
              </div>

              <div className="absolute -bottom-6 left-8 w-16 h-[3px] bg-[#F4B400] rounded-full" />
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {trustCards.map((card) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.title}
                  variants={cardVariants}
                  className="bg-white border border-gray-100 rounded-[20px] p-7 hover:-translate-y-1 hover:border-[#F4B400] hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-[#F4B400]/10 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-[#F4B400]" />
                  </div>
                  <h4 className="font-bold text-[#0F172A]">{card.title}</h4>
                  <p className="text-sm text-[#334155] mt-2 leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-20"
        >
          <div className="w-16 h-[2px] bg-[#F4B400] mx-auto mb-6" />
          <p className="text-[#334155] text-lg italic max-w-[700px] mx-auto">
            &ldquo;Committed to delivering dependable industrial engineering solutions through
            innovation, quality, and long-term partnerships.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs
