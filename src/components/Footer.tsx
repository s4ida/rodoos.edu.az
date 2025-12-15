import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl mb-6 text-white">Rodoos İnnovativ Təhsil Mərkəzi</h3>
            <p className="text-gray-400 mb-6">
              Peşəkar təhsil xidmətləri və müasir kurslarla gələcəyinizi bizimlə birlikdə qurun.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl mb-6 text-white">Sürətli Keçidlər</h4>
            <ul className="space-y-3">
              <li>
                <a href="hero" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Ana Səhifə
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Haqqımızda
                </a>
              </li>
              <li>
                <a href="services" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Kurslar
                </a>
              </li>
              <li>
                <a href="teachers" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Müəllimlər
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Əlaqə
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl mb-6 text-white">Xidmətlər</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Proqramlaşdırma
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Xarici Dil
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Riyaziyyat
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Dizayn
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  İmtahan Hazırlığı
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl mb-6 text-white">Əlaqə</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <span>Masallı şəh. Heydər Əliyev pr. ASAN Xidmət Mərkəzinin yanı</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="tel:+994501234567" className="hover:text-blue-400 transition-colors">
                  +994 (70) 273 25 00
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="mailto:info@tehsilmerkezi.az" className="hover:text-blue-400 transition-colors">
                  rodoos.itm.office@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <p>© 2025 Təhsil Mərkəzi. Bütün hüquqlar qorunur.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-400 transition-colors">
                Gizlilik Siyasəti
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                İstifadə Şərtləri
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}