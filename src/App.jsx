import "./index.css"
import { Navbar } from "./layout/Navbar"
import { Hero } from "./section/Hero"
import { About } from "./section/About"
import { Experience } from "./section/Experience"
import { Projects } from "./section/Projects"
import { Contact } from "./section/Contact"
function App() {
  

  return (
   <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero/>
        <About/>
        <Experience/>
        <Projects/>
        <Contact/>
      </main>
   </div>
  )
}

export default App
