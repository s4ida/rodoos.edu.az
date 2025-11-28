import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Teachers from "./components/Teachers";
import Blog from "./components/Blog";
import Exams from "./components/Exams";
import News from "./components/News";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Services />
      <Teachers />
      <Blog />
      <Exams />
      <News />
      <Footer />
    </div>
  );
}