import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Work from "./components/Work";
import About from "./components/About"
import Contact from "./components/Contact"

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#0C0C0C] text-[#D7E2EA]">
      <Navbar />

      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
    </div>
  );
}