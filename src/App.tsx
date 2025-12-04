import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Teachers from "./components/Teachers";
import Blog from "./components/Blog";
import Exams from "./components/Exams";
import News from "./components/News";
import Footer from "./components/Footer";
import BlogDetail from "./components/BlogDetail";

function App() {
  return (
    <Routes>
      {/* Əsas səhifə */}
      <Route
        path="/"
        element={
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
        }
      />

      {/* Blog detalları */}
      <Route path="/blog/:id" element={<BlogDetail />} />
    </Routes>
  );
}

export default App;
