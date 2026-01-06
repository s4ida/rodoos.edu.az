import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-gradient-to-b from-gray-900 to-gray-950 text-white"
    >
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* SOL BLOK */}
          <div>
            <h3 className="text-2xl mb-6">
              Rodoos İnnovativ Təhsil Mərkəzi
            </h3>
            <p className="text-gray-400 mb-6">
              Peşəkar təhsil xidmətləri və müasir kurslarla gələcəyinizi bizimlə
              birlikdə qurun.
            </p>

            {/* SOSİAL ŞƏBƏKƏLƏR */}
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/share/1C9NmQy7uP/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700
                           flex items-center justify-center transition
                           no-underline focus:outline-none"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href="https://www.instagram.com/rodoos.edu.az?igsh=MW9hdzVpYmpwMjdteg=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700
                           flex items-center justify-center transition
                           no-underline focus:outline-none"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://www.linkedin.com/company/rodoos-edu-az/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700
                           flex items-center justify-center transition
                           no-underline focus:outline-none"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href="https://www.tiktok.com/@rodoos.edu.az?_r=1&_t=ZS-92LN8yjKh0q"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700
                           flex items-center justify-center transition
                           no-underline focus:outline-none"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* SÜRƏTLİ KEÇİDLƏR */}
          <div>
            <h4 className="text-xl mb-6">Sürətli Keçidlər</h4>
            <ul className="space-y-3">
              <li><a href="#hero" className="text-gray-400 hover:text-blue-400 no-underline">Ana Səhifə</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-blue-400 no-underline">Haqqımızda</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-blue-400 no-underline">Kurslar</a></li>
              <li><a href="#teachers" className="text-gray-400 hover:text-blue-400 no-underline">Müəllimlər</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-blue-400 no-underline">Əlaqə</a></li>
            </ul>
          </div>

          {/* XİDMƏTLƏR */}
          <div>
            <h4 className="text-xl mb-6">Xidmətlər</h4>
            <ul className="space-y-3 text-gray-400">
              <li>Proqramlaşdırma</li>
              <li>İngilis dili</li>
              <li>Məntiq</li>
              <li>Rus dili</li>
              <li>Azərbaycan dili</li>
              <li>Riyaziyyat</li>
              <li>İmtahan hazırlığı</li>
            </ul>
          </div>

          {/* ƏLAQƏ */}
          <div>
            <h4 className="text-xl mb-6">Əlaqə</h4>
        <ul className="space-y-4 text-gray-400">
  {/* Ünvan → Google Maps */}
  <li>
    <a
      href="https://www.google.com/maps/search/?api=1&query=Masallı+ASAN+Xidmət+Mərkəzi"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 hover:text-blue-400 no-underline"
    >
      <span className="w-5 h-5 flex items-center justify-center text-blue-400">
        <MapPin className="w-5 h-5" />
      </span>
      <span>
        Masallı şəh. Heydər Əliyev pr. ASAN Xidmət Mərkəzinin yanı
      </span>
    </a>
  </li>

  {/* Telefon → WhatsApp */}
  <li>
    <a
      href="https://wa.me/994702732500"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 hover:text-blue-400 no-underline"
    >
      <span className="w-5 h-5 flex items-center justify-center text-blue-400">
        <Phone className="w-5 h-5" />
      </span>
      <span>+994 (70) 273 25 00</span>
    </a>
  </li>

  {/* Gmail → Mail yaz */}
  <li>
    <a
      href="mailto:rodoos.itm.office@gmail.com"
      className="flex items-center gap-3 hover:text-blue-400 no-underline"
    >
      <span className="w-5 h-5 flex items-center justify-center text-blue-400">
        <Mail className="w-5 h-5" />
      </span>
      <span>rodoos.itm.office@gmail.com</span>
    </a>
  </li>
</ul>

          </div>
        </div>

        {/* ALT HİSSƏ */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <p>© 2025 Rodoos İnnovativ Təhsil Mərkəzi. Bütün hüquqlar qorunur.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-400 no-underline">
                Gizlilik Siyasəti
              </a>
              <a href="#" className="hover:text-blue-400 no-underline">
                İstifadə Şərtləri
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
