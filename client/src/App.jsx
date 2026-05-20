import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface scroll-smooth">
      <Navbar />
      <main className="flex-grow">
        <div id="home" className="scroll-mt-24">
          <Home />
        </div>
        <div id="about" className="scroll-mt-24">
          <About />
        </div>
        <div id="projects" className="scroll-mt-24">
          <Projects />
        </div>
        <div id="contact" className="scroll-mt-24">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
