import { Card, CardContent } from "./ui/card";
import { Linkedin, Mail, Twitter } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const teachers = [
  {
    id: 1,
    name: "Səidə Şahəliyeva",
    profession: "Proqramlaşdırma Müəllimi",
    bio: "10 illik təcrübəyə malik, Microsoft sertifikatlı proqramlaşdırma mütəxəssisi",
    image: "https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYzNzU5MjU2fDA&ixlib=rb-4.1.0&q=80&w=400",
    social: {
      linkedin: "#",
      email: "leyla@example.com",
      twitter: "#",
    },
  },
  {
    id: 2,
    name: "Rəşad Əliyev",
    profession: "İngilis Dili Müəllimi",
    bio: "CELTA sertifikatlı, 8 illik beynəlxalq təhsil təcrübəsi",
    image: "https://images.unsplash.com/photo-1758270704925-fa59d93119c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwcHJvZmVzc29yJTIwdGVhY2hpbmd8ZW58MXx8fHwxNzYzNzI3MDQyfDA&ixlib=rb-4.1.0&q=80&w=400",
    social: {
      linkedin: "#",
      email: "rashad@example.com",
      twitter: "#",
    },
  },
  {
    id: 3,
    name: "Aynur Həsənova",
    profession: "Riyaziyyat Müəllimi",
    bio: "15 illik təcrübə, olimpiada hazırlığı üzrə ekspert",
    image: "https://images.unsplash.com/photo-1551989745-347c28b620e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwdGVhY2hlcnxlbnwxfHx8fDE3NjM3NTkyNTZ8MA&ixlib=rb-4.1.0&q=80&w=400",
    social: {
      linkedin: "#",
      email: "aynur@example.com",
      twitter: "#",
    },
  },
];

export default function Teachers() {
  return (
    <section id="teachers" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-blue-900">Müəllimlərimiz</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Təcrübəli və peşəkar müəllimlər komandası
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teachers.map((teacher) => (
            <Card
              key={teacher.id}
              className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
            >
              <CardContent className="pt-8">
                <div className="relative mb-6 inline-block">
                  <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-blue-100 mx-auto">
                    <ImageWithFallback
                      src={teacher.image}
                      alt={teacher.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-xl mb-2 text-blue-900">{teacher.name}</h3>
                <p className="text-blue-600 mb-3">{teacher.profession}</p>
                <p className="text-gray-600 mb-6 px-4">{teacher.bio}</p>
                <div className="flex justify-center gap-4">
                  <a
                    href={teacher.social.linkedin}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${teacher.social.email}`}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <a
                    href={teacher.social.twitter}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}