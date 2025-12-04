import { BookOpen, Code, Languages, Calculator, FileSpreadsheet } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const services = [
  {
    id: 1,
    icon: <Code className="w-12 h-12 text-black-600" />,
    title: "Proqramlaşdırma Kursları",
    description: "Web Development, HTML, CSS, Python, Javascript və digər müasir texnologiyalar",
    price: "55 AZN/ay",
    duration: "6 ay",
  },
   {
    id: 2,
    icon:<FileSpreadsheet className="w-12 h-12 text-black-600" />,
    title: "Microsoft Office proqramları",
    description: "Word,Excel,PowerPoint",
    price: "40 AZN/ay",
    duration: "3 ay",
  },
  {
    id: 3,
    icon: <Languages className="w-12 h-12 text-black-600" />,
    title: "İngilis dili",
    description: "Cambridge metodlarına əsaslanan ingilis dili təhsili",
    price: "45 AZN/ay",
    duration: "6 ay",
  },
   {
    id: 3,
    icon: <Languages className="w-12 h-12 text-black-600" />,
    title: "Rus dili",
    description: "Rus dilində peşəkar danışıq və qrammatika təlim proqramları",
    price: "45 AZN/ay",
    duration: "6 ay",
  },
  {
    id: 4,
    icon: <Calculator className="w-12 h-12 text-black-600" />,
    title: "Riyaziyyat",
    description: "Abituriyent hazırlığı",
    price: "40 AZN/ay",
    duration: "Müddətsiz",
  },
  
 
  {
    id: 5,
    icon: <BookOpen className="w-12 h-12 text-black-600" />,
    title: "Azərbaycan dili",
    description: "Abituriyent hazırlığı",
    price:  "40 AZN/ay",
    duration: "Müddətsiz",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-black-900">Xidmətlərimiz</h2>
          <p className="text-xl text-black-600 max-w-2xl mx-auto">
            Müxtəlif sahələr üzrə keyfiyyətli təhsil proqramları və kurslar
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service) => (
            <Card
              key={service.id}
              className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
            >
              <CardHeader>
                <div className="mb-4 bg-blue-50 rounded-2xl p-4 w-fit">{service.icon}</div>
                <CardTitle className="text-xl text-blue-900">{service.title}</CardTitle>
                <CardDescription className="text-gray-600 mt-2">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
              <div className="flex justify-between items-center">
  <span className="text-gray-600">Qiymət:</span>
  <span style={{ color: "#683BC7" }}>{service.price}</span>
</div>
<div className="flex justify-between items-center">
  <span className="text-gray-600">Müddət:</span>
 <span style={{ color: "#683BC7" }}>{service.duration}</span>
</div>

              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}