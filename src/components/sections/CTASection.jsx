import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Phone, Mail, MapPin } from "lucide-react"

const contacts = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 91588 54848",
    href: "tel:+919158854848",
  },
  {
    icon: Mail,
    label: "Email",
    value: " insulation.hitech777@gmail.com",
    href: "mailto: insulation.hitech777@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Kolhapur, Maharashtra",
    href: "#",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

function CTASection() {
  return (
    <section className="bg-[#0B2D5C] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-16 lg:py-20">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block text-[#F4B400] text-sm font-semibold tracking-[2px] uppercase">
              Let&apos;s Work Together
            </span>

            <h2 className="text-white text-[34px] md:text-[42px] lg:text-[52px] font-extrabold leading-[1.1] mt-3">
              Ready to Discuss Your Industrial Project?
            </h2>

            <p className="text-[rgba(255,255,255,0.8)] text-lg leading-[1.7] mt-4">
              Connect with HITECH GROUP for industrial engineering, insulation, inspection, and
              technical solutions. Our team is ready to understand your requirements and deliver
              dependable, results-driven outcomes.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              {contacts.map((contact) => {
                const Icon = contact.icon
                return (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="bg-white/10 rounded-[18px] p-5 text-center hover:bg-white/15 transition-colors"
                  >
                    <Icon size={22} className="text-[#F4B400] mx-auto mb-3" />
                    <span className="block text-xs font-semibold text-[rgba(255,255,255,0.6)] uppercase tracking-[1px]">
                      {contact.label}
                    </span>
                    <span className="block text-sm font-medium text-white mt-1 break-words">
                      {contact.value}
                    </span>
                  </a>
                )
              })}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-[24px] shadow-2xl p-8 md:p-10 max-w-[460px] mx-auto lg:ml-auto">
              <h3 className="text-2xl font-extrabold text-[#0B2D5C]">Get in Touch</h3>
              <p className="text-[#334155] mt-3 leading-relaxed">
                Have a project in mind or need expert engineering support? Our team is here to help
                you find the right solution.
              </p>

              <div className="mt-8 space-y-4">
                <Link
                  to="/contact"
                  className="h-14 px-8 bg-[#F4B400] text-[#0F172A] font-semibold rounded-xl inline-flex items-center justify-center hover:bg-[#d9a000] transition-colors w-full"
                >
                  Contact Us
                </Link>
                <a
                  href="tel:+918767814930"
                  className="h-14 px-8 border-2 border-[#0B2D5C] text-[#0B2D5C] font-semibold rounded-xl inline-flex items-center justify-center hover:bg-[#0B2D5C] hover:text-white transition-colors w-full"
                >
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
