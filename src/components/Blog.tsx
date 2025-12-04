import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router-dom";
import ProgrammingImage from "/src/img/programming.jpg";
import EnglishImage from "/src/img/english.jpg";
import RusImage from "/src/img/rusdili.jpg";
import AzImage from "/src/img/azdili.jpg";
import MathImage from "/src/img/math.jpg";

const blogPosts = [
  {
    id: 1,
    title: "Proqramlaşdırma öyrənməyə necə başlamaq olar?",
    excerpt: "Proqramlaşdırmaya başlamaq istəyənlər üçün ətraflı bələdçi və faydalı məsləhətlər.",
    image: ProgrammingImage,
    category: "Proqramlaşdırma",
  },
  {
    id: 2,
    title: "İngilis dilini tez öyrənməyin 5 effektiv yolu",
    excerpt: "İngilis dilini səmərəli öyrənmək üçün sübut edilmiş metodlar və praktiki məsləhətlər.",
    image: EnglishImage,
    category: "İngilis dili",
  },
  {
    id: 3,
    title: "Rus dilini sıfırdan necə öyrənmək olar?",
    excerpt: "Rus dilini səmərəli öyrənmək üçün sübut edilmiş metodlar və praktiki məsləhətlər",
    image: RusImage,
    category: "Rus dili",
  },
    {
    id: 4,
    title: "Azərbaycan dilində bacarıqlı yazı və danışıq necə inkişaf etdirilir?",
    excerpt: "Dil bacarıqlarını gücləndirmək üçün qrammatika, söz ehtiyatı yolları.",
    image: AzImage,
    category: "Azərbaycan dili",
  },
    {
    id: 5,
    title: "Riyaziyyatı başa düşmək və həll etmək yolları",
    excerpt: "Riyazi bacarıqlarıbızı inkişaf etdirməyin ideal yolları.",
    image: MathImage,
    category: "Riyaziyyat",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-blue-900">Bloq</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Təhsil və karyera ilə bağlı faydalı məqalələr
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
            >
              <div className="relative h-56 overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {post.category}
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                </div>
                <CardTitle className="text-xl text-blue-900 line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="text-gray-600 line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
               <Link to={`/blog/${post.id}`}>
<Link to={`/blog/${post.id}`}>
  <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 h-auto">
    Davamı
    <ArrowRight className="w-4 h-4 ml-2" />
  </Button>
</Link>
</Link>

              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}