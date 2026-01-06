import { useState } from "react";
import { Menu, X,} from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Ana Səhifə", href: "#hero" },
    { name: "Haqqımızda", href: "#about" },
    { name: "Xidmətlərimiz", href: "#services" },
    { name: "Müəllimlər", href: "#teachers" },
    { name: "Bloq", href: "#blog" },
    { name: "İmtahanlar", href: "#exams" },
    { name: "Əlaqə", href: "#footer" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 nav-con navcontainer">
        <div className="flex items-center justify-between h-20 nav-div navbardiv">
          {/* Logo */}
         
{/* Logo */}
<img
  className="logo"
  src="/img/rodoos-logo1.png"
  alt="logo"

/>
         

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
          
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-700 hover:text-blue-600 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                >
                  {link.name}
                </a>
              ))}
          
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
