import { motion } from "framer-motion"
import { Layers } from "lucide-react"
import rockwool from "@/assets/images/bd/rockwool.png"
import glasswool from "@/assets/images/bd/glasswool.png"
import mineralwool from "@/assets/images/bd/mineralwool.png"
import armaflex from "@/assets/images/bd/armaflex.png"
import alusheet from "@/assets/images/bd/alusheet.png"
import cold from "@/assets/images/bd/cold.png"
import alusheetplain from "@/assets/images/bd/aluminsheet.png"
import fiberglassroll from "@/assets/images/bd/fiberglassroll.png"
import rockwoolmatt from "@/assets/images/bd/rockwookmatt.png"
import rockwoolslab from "@/assets/images/bd/rockwoolslab.png"
import turbineinsu from "@/assets/images/bd/turbineinsulation.png"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const products = [
  {
    name: "Rockwool",
    description: "Rigid mineral wool boards for high-temperature thermal insulation.",
    image: rockwool,
    alt: "Rockwool insulation material",
  },
  {
    name: "Glass Wool",
    description: "Lightweight fibrous insulation for thermal and acoustic control.",
    image: glasswool,
    alt: "Glass wool insulation material",
  },
  {
    name: "Mineral Wool",
    description: "Versatile insulation for heat retention, fire resistance and noise control.",
    image: mineralwool,
    alt: "Mineral wool insulation material",
  },
  {
    name: "ArmaFlex",
    description: "Flexible elastomeric insulation for chilled and refrigeration systems.",
    image: armaflex,
    alt: "ArmaFlex insulation material",
  },
  {
    name: "Aluminium Cladding Sheets",
    description: "Protective metal cladding that shields insulation from weather and damage.",
    image: alusheet,
    alt: "Aluminium cladding sheets",
  },
  {
    name: "Cold Insulation Materials",
    description: "Specialized materials for condensation control and low-temperature protection.",
    image: cold,
    alt: "Cold insulation materials",
  },
  {
    name: "Fiberglass Insulation Roll",
    description:
      "Fiberglass Insulation Roll is a lightweight compressible insulation material consisting of fine long inorganic fibers bonded together by a high temperature binder. It contains many small pockets of air between the glass fibers, and these small air pockets result in high thermal and acoustic insulation properties. Fiberglass wool is produced in rolls with different thermal and mechanical properties.",
    image: fiberglassroll,
    alt: "Fiberglass insulation roll",
  },
  {
    name: "Aluminum plain Sheet",
    description:
      "Aluminum sheets are widely used in fabricating metal insulation jacketing. Aluminum is lightweight, flexible to fabricate easily at site and has good resistance to corrosion. Apart from this Aluminum has many characteristics due to which it is commonly used as an insulation jacketing metal.",
    image: alusheetplain,
    alt: "Aluminum plain sheet",
  },
  {
    name: "Rockwool Lightly Resin bonded Slab",
    description:
      "Rockwool Slabs are semi rigid and rigid boards manufactured from stable stone fiber bonded with thermosetting resin binder. It can resist temperature up to 750 Deg C. It is lightweight, strong, malleable, easy to handle and cut to suit intricate shape. Rockwool Slabs are available unfaced or faced with Glass reinforced Aluminum Foil / Kraft paper laminated facing and Black Fiber Glass Tissue.",
    image: rockwoolslab,
    alt: "Rockwool lightly resin bonded slab",
  },
  {
    name: "Rockwool Lightly Resin bonded mattresses",
    description:
      "Rockwool mattress is lightly resin bonded mineral fibers faced one side with hexagonal galvanized or stainless steel wire netting. It is a flexible material having firm structure reinforced due to wire mesh. It is non-combustible in nature.",
    image: rockwoolmatt,
    alt: "Rockwool lightly resin bonded mattress",
  },
  {
    name: "Turbine Insulation",
    description:
      "Turbine insulation consists of custom-fit, removable, and reusable multi-layered blankets or jackets designed to cover high-temperature gas and steam turbine casings.",
    image: turbineinsu,
    alt: "Turbine insulation",
  },
]

function IndustrialInsulationProducts() {
  return (
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
                    alt={product.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
          className="bg-[#0B2D5C] rounded-[24px] mt-10 px-8 py-14 text-center"
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
  )
}

export default IndustrialInsulationProducts