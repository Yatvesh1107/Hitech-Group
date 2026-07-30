import Hero from "../components/sections/Hero"
import AboutSection from "../components/sections/AboutSection"
import BusinessDivisions from "../components/sections/BusinessDivisions"
import WhyChooseUs from "../components/sections/WhyChooseUs"
import Industries from "../components/sections/Industries"
import ServicesSection from "../components/sections/ServicesSection"
import ProjectsSection from "../components/sections/ProjectsSection"
import ClientsSection from "../components/sections/ClientsSection"

function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <BusinessDivisions />
      <WhyChooseUs />
      <Industries />
      <ServicesSection />
      <ProjectsSection />
      <ClientsSection />
    </>
  )
}

export default Home
