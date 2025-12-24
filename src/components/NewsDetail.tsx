import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase, type News } from "../lib/supabase";
import { Button } from "./ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaEnvelope,
  FaLink,
} from "react-icons/fa";

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const shareRef = useRef<HTMLDivElement>(null);

  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    if (id) fetchNewsById(parseInt(id));
  }, [id]);

  const fetchNewsById = async (newsId: number) => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", newsId)
        .single();
      if (error) throw error;
      setNews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const images = news?.images || [];
  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const pageUrl = window.location.href;
  const pageTitle = news?.title || "";

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(pageTitle + " " + pageUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(pageUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
    gmail: `https://mail.google.com/mail/?view=cm&to=&su=${encodeURIComponent(pageTitle)}&body=${encodeURIComponent(pageUrl)}`,
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(pageUrl);
    alert("Link kopyalandı ✅");
    setShareOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
        setShareOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [shareRef]);

  if (loading) {
    return (
      <div className="min-h-screen page-offset">
        <Header />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen page-offset">
        <Header />
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold">Xəbər tapılmadı</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const readTime = Math.max(1, Math.ceil(news.content.split(" ").length / 200));

  return (
    <div className="min-h-screen page-offset">
      <Header />

      <main className="pb-16 bg-gray-50">
        <div className="container mx-auto px-6 mb-6">
          <Button onClick={() => navigate("/#news")} variant="outline" className="backbtn">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>
        </div>

        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm overflow-visible">
            <div className="grid grid-cols-1 md:grid-cols-2">

              {/* SOL — ŞƏKİL */}
              <div className="news-photo-container p-4 md:p-6">
                <div className="news-carousel relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
                  {hasImages ? (
                    <img
                      src={images[currentImageIndex]}
                      alt={news.title}
                      className="news-carousel-image w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="news-no-image flex items-center justify-center w-full h-full bg-gray-200">
                      Şəkil yoxdur
                    </div>
                  )}

                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={prevImage}
                        className="news-nav-btn left top-1/2 -translate-y-1/2"
                      >
                        <ChevronLeft />
                      </button>
                      <button
                        onClick={nextImage}
                        className="news-nav-btn right top-1/2 -translate-y-1/2"
                      >
                        <ChevronRight />
                      </button>
                    </>
                  )}

                  {hasImages && (
                    <div className="news-counter absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full z-20">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>

                {/* Düymələr */}
                <div className="flex flex-row gap-4 mt-6"> {/* horizontal düzülüş, arada boşluq */}
                  
                  {/* Paylaş düyməsi */}
                  <div className="news-share-relative flex-1" ref={shareRef}>
                    <Button
                      className="w-full flex items-center justify-center sharebtn"
                      onClick={() => setShareOpen((prev) => !prev)}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Paylaş
                    </Button>

                    {shareOpen && (
                      <div className="news-share-dropdown show">
                        <a href={shareLinks.whatsapp} target="_blank" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                          <FaWhatsapp className="w-5 h-5" /> WhatsApp
                        </a>
                        <a href={shareLinks.telegram} target="_blank" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                          <FaTelegramPlane className="w-5 h-5" /> Telegram
                        </a>
                        <a href={shareLinks.twitter} target="_blank" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                          <FaTwitter className="w-5 h-5" /> X (Twitter)
                        </a>
                        <a href={shareLinks.facebook} target="_blank" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                          <FaFacebook className="w-5 h-5" /> Facebook
                        </a>
                        <a href={shareLinks.linkedin} target="_blank" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                          <FaLinkedin className="w-5 h-5" /> LinkedIn
                        </a>
                        <a href={shareLinks.gmail} target="_blank" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                          <FaEnvelope className="w-5 h-5" /> Gmail
                        </a>
                        <button onClick={copyLink} className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100">
                          <FaLink className="w-5 h-5" /> Linki kopyala
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Digər xəbərlər düyməsi */}
                  <Button
                    variant="outline"
                    className="flex-1 othernews"
                    onClick={() => {
                      navigate("/"); 
                      setTimeout(() => {
                        const newsSection = document.getElementById("news");
                        if (newsSection) newsSection.scrollIntoView({ behavior: "smooth" });
                      }, 50);
                    }}
                  >
                    Digər xəbərlər
                  </Button>

                </div>
              </div>

              {/* SAĞ — MƏTN */}
              <div className="news-text-container p-6 lg:p-8">
                <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
                {news.content.split("\n").map(
                  (p, i) =>
                    p.trim() && (
                      <p key={i} className="mb-3 leading-relaxed text-gray-800">
                        {p}
                      </p>
                    )
                )}
                <p className="mt-4 text-sm text-gray-500">
                  Təxmini oxuma müddəti: {readTime} dəq
                </p>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetail;
