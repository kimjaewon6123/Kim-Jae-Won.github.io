import Header from "@/components/header"
import Hero from "@/components/hero"
import AboutMe from "@/components/about-me"
import Skills from "@/components/skills"
import Portfolio from "@/components/portfolio"
import Gallery from "@/components/gallery"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <AboutMe />
      <Skills />
      <Portfolio />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  )
}
