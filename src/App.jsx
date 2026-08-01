import { Routes, Route } from "react-router-dom"
import TopBar from "./components/layout/TopBar"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import ScrollToTop from "./components/layout/ScrollToTop"
import Home from "./pages/Home"
import About from "./pages/About"
import Divisions from "./pages/Divisions"
import Projects from "./pages/Projects"
import Clients from "./pages/Clients"
import Contact from "./pages/Contact"
import IndustrialInsulation from "./pages/IndustrialInsulation"
import ExpertsUltrasonics from "./pages/ExpertsUltrasonics"
import PrecisionTech from "./pages/PrecisionTech"

function App() {
  return (
    <>
      <ScrollToTop />
      <TopBar />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/divisions" element={<Divisions />} />
          <Route path="/divisions/industrial-insulation" element={<IndustrialInsulation />} />
          <Route path="/divisions/experts-in-ultrasonics" element={<ExpertsUltrasonics />} />
          <Route path="/divisions/precision-tech" element={<PrecisionTech />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
