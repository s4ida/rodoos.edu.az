import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase, type News } from "../lib/supabase";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, Calendar, User, Clock, Share2, BookmarkPlus } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import ImageCarousel from "./ImageCarousel";

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

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
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen pt-28 flex items-center justify-center">Yüklənir...</div>;
  if (!news)
    return (
      <>
        <Header />
        <div className="min-h-screen pt-28 flex items-center justify-center">
          <p>Xəbər tapılmadı</p>
        </div>
        <Footer />
      </>
    );

  const estimatedReadTime = Math.max(1, Math.ceil(news.content.split(" ").length / 200));

  return (
    <>
      <Header />
      <div className="pt-28 bg-gray-50 min-h-screen">
        <div className="container col-12 col-sm-12 col-md-12 col-lg-12">
          {/* Sol - Carousel */}
          <div className="lg:col-span-8">
            <ImageCarousel images={news.images || []} title={news.title} />
          </div>

          {/* Sağ - Mətn */}
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <div className="space-y-3">
              <div className="flex gap-2 items-center">
                <Badge>{news.tag}</Badge>
                {news.important && <Badge className="bg-red-100 text-red-800">VACİB XƏBƏR</Badge>}
              </div>
              <h1 className="text-2xl font-bold">{news.title}</h1>
              <div className="flex flex-wrap gap-3 text-gray-600 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(news.date).toLocaleDateString("az-AZ")}
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" /> {news.author}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {estimatedReadTime} dəq oxuma
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              {news.content.split("\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Share2 className="w-4 h-4 mr-1" /> Paylaş
              </Button>
              <Button variant="outline" className="flex-1 hover:bg-green-50">
                <BookmarkPlus className="w-4 h-4 mr-1" /> Saxla
              </Button>
              <Button variant="outline" onClick={() => navigate("/")} className="flex-1 hover:bg-gray-50">
                Digər xəbərlər
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsDetail;
