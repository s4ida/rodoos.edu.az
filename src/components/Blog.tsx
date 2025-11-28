import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const blogPosts = [
  {
    id: 1,
    title: "Proqramlaşdırma öyrənməyə necə başlamaq olar?",
    excerpt: "Proqramlaşdırmaya başlamaq istəyənlər üçün ətraflı bələdçi və faydalı məsləhətlər.",
    image: "https://images.unsplash.com/photo-1546074176-abecd33d2b53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBibG9nJTIwcmVhZGluZ3xlbnwxfHx8fDE3NjM3NTkyNTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "15 Noyabr 2024",
    category: "Proqramlaşdırma",
  },
  {
    id: 2,
    title: "İngilis dilini tez öyrənməyin 5 effektiv yolu",
    excerpt: "İngilis dilini səmərəli öyrənmək üçün sübut edilmiş metodlar və praktiki məsləhətlər.",
    image: "https://images.unsplash.com/photo-1542725752-e9f7259b3881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMGJvb2tzJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzYzNzI3NzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "12 Noyabr 2024",
    category: "Xarici Dil",
  },
  {
    id: 3,
    title: "Online təhsilin üstünlükləri",
    excerpt: "Müasir dövrdə online təhsilin verdiyi imkanlar və üstünlüklər haqqında məlumat.",
    image: "https://images.unsplash.com/photo-1762330916233-221b49fce7f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGNvdXJzZXxlbnwxfHx8fDE3NjM2OTI5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "8 Noyabr 2024",
    category: "Təhsil",
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
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <CardTitle className="text-xl text-blue-900 line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="text-gray-600 line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 h-auto">
                  Davamı
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}