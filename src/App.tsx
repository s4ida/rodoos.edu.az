import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Teachers from "./components/Teachers";
import Blog from "./components/Blog";
import Exams from "./components/Exams";
import NewsSection from "./components/News";
import Footer from "./components/Footer";
import BlogDetail from "./components/BlogDetail";
import NewsDetail from "./components/NewsDetail";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Routes>
      {/* Ana səhifə */}
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
            <NewsSection />
            <Footer />
          </div>
        }
      />

      {/* Blog detalları */}
      <Route path="/blog/:id" element={<BlogDetail />} />
      
      {/* Xəbər detalları */}
      <Route path="/news/:id" element={<NewsDetail />} />
      
      {/* Admin paneli */}
      <Route path="/admin" element={<AdminRoute />} />
    </Routes>
  );
}

export default App;