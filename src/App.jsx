import "./index.css"
import { Navbar } from "./layout/Navbar"
import { Hero } from "./section/Hero"
import { About } from "./section/About"
import { Projects } from "./section/Projects"
import { Contact } from "./section/Contact"
import { Diplome } from "./section/Diplome"
import { Footer } from "./layout/Footer"
function App() {
  

  return (
   <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero/>
        <About/>
        <Diplome/>
        <Projects/>
        <Contact/>
      </main>
      <Footer/>
   </div>
  )
}

export default App
