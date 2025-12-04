import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const blogData = [
  {
    id: 1,
    title: "Proqramlaşdırma öyrənməyə necə başlamaq olar?",
    date: "15 Noyabr 2024",
    category: "Proqramlaşdırma",
    image: "https://images.unsplash.com/photo-1546074176-abecd33d2b53?auto=format&w=1200",
    content: `
Proqramlaşdırma müasir dövrün ən vacib bacarıqlarından biridir. Bu sahəyə başlamaq üçün ilk addım düzgün istiqaməti müəyyənləşdirməkdir.

1️⃣ **Nədən başlamaq lazımdır?**  
İlk olaraq başlanğıc səviyyəsində sadə və öyrənilməsi rahat olan dillərlə tanış olun: Python, JavaScript və ya C#. Python yeni başlayanlar üçün ən rahat dildir.

2️⃣ **Əsas anlayışları öyrənmək**  
Dəyişənlər, funksiyalar, şərt operatorları, döngülər kimi əsas anlayışları mütləq mənimsəməlisiniz.

3️⃣ **Kiçik layihələr edin**  
Nə qədər çox praktika etsəniz, bir o qədər sürətli inkişaf edərsiniz.

4️⃣ **Online kurslardan istifadə edin**  
Coursera, Udemy, CodeAcademy və YouTube dərsləri çox kömək edir.

5️⃣ **Hər gün ən az 1 saat məşq edin**  
Daimi təkrar sizi proqramçıya çevirəcək.
    `
  },
  {
    id: 2,
    title: "İngilis dilini tez öyrənməyin 5 effektiv yolu",
    date: "12 Noyabr 2024",
    category: "Xarici Dil",
    image: "https://images.unsplash.com/photo-1542725752-e9f7259b3881?auto=format&w=1200",
    content: `
İngilis dilini qısa zamanda öyrənmək mümkündür, əgər düzgün metod seçilərsə.

1️⃣ **Dinləmə bacarığını inkişaf etdirin**  
Podkastlar, filmlər və musiqilər ən effektiv üsullardan biridir.

2️⃣ **Söz bazanızı genişləndirin**  
Hər gün 10 yeni söz öyrənmək 1 ay sonra böyük fərq yaradır.

3️⃣ **Danışıq məşqləri edin**  
Mirror metodu ilə özünüzə danışmaq çox faydalıdır.

4️⃣ **Grammarly, Elsa speak kimi tətbiqlərdən istifadə edin**  
Bu tətbiqlər səhvləri düzəltməyə kömək edir.

5️⃣ **Real həyatda məşq edin**  
Telegram və ya WhatsApp qruplarında yabancılarla danışa bilərsiniz.
    `
  },
  {
    id: 3,
    title: "Online təhsilin üstünlükləri",
    date: "8 Noyabr 2024",
    category: "Təhsil",
    image: "https://images.unsplash.com/photo-1762330916233-221b49fce7f5?auto=format&w=1200",
    content: `
Online təhsil son illərdə ən sürətlə inkişaf edən sahələrdən biridir.

1️⃣ **Zaman sərbəstliyi**  
İstədiyiniz vaxt dərsə qoşula bilərsiniz.

2️⃣ **Yol xərci və vaxt itirmə yoxdur**  
Tamamilə evdən öyrənmək imkanı yaradır.

3️⃣ **Daha çox resurs**  
YouTube, Coursera, Udemy kimi platformalar geniş material təqdim edir.

4️⃣ **Təkcə dərs deyil, real layihələr də etmək olur**  
Bu da biliklərin praktikaya keçməsini asanlaşdırır.

5️⃣ **Ucuz və əlçatandır**  
Ənənəvi təhsildən daha sərfəlidir.
    `
  },
  {
    id: 4,
    title: "Online təhsilin üstünlükləri",
    date: "8 Noyabr 2024",
    category: "Təhsil",
    image: "https://images.unsplash.com/photo-1762330916233-221b49fce7f5?auto=format&w=1200",
    content: `
Online təhsil son illərdə ən sürətlə inkişaf edən sahələrdən biridir.

1️⃣ **Zaman sərbəstliyi**  
İstədiyiniz vaxt dərsə qoşula bilərsiniz.

2️⃣ **Yol xərci və vaxt itirmə yoxdur**  
Tamamilə evdən öyrənmək imkanı yaradır.

3️⃣ **Daha çox resurs**  
YouTube, Coursera, Udemy kimi platformalar geniş material təqdim edir.

4️⃣ **Təkcə dərs deyil, real layihələr də etmək olur**  
Bu da biliklərin praktikaya keçməsini asanlaşdırır.

5️⃣ **Ucuz və əlçatandır**  
Ənənəvi təhsildən daha sərfəlidir.
    `
  },
  {
    id: 5,
    title: "Online təhsilin üstünlükləri",
    date: "8 Noyabr 2024",
    category: "Təhsil",
    image: "https://images.unsplash.com/photo-1762330916233-221b49fce7f5?auto=format&w=1200",
    content: `
Online təhsil son illərdə ən sürətlə inkişaf edən sahələrdən biridir.

1️⃣ **Zaman sərbəstliyi**  
İstədiyiniz vaxt dərsə qoşula bilərsiniz.

2️⃣ **Yol xərci və vaxt itirmə yoxdur**  
Tamamilə evdən öyrənmək imkanı yaradır.

3️⃣ **Daha çox resurs**  
YouTube, Coursera, Udemy kimi platformalar geniş material təqdim edir.

4️⃣ **Təkcə dərs deyil, real layihələr də etmək olur**  
Bu da biliklərin praktikaya keçməsini asanlaşdırır.

5️⃣ **Ucuz və əlçatandır**  
Ənənəvi təhsildən daha sərfəlidir.
    `
  },
];

export default function BlogDetail() {
  const { id } = useParams();
  const blog = blogData.find((b) => b.id === Number(id));

  if (!blog) return <h2>Blog tapılmadı</h2>;

  return (
    <>
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <span className="text-blue-600 font-semibold">{blog.category}</span>
        <h1 className="text-4xl font-bold text-blue-900 mt-2">{blog.title}</h1>
        <p className="text-gray-500 mt-2">{blog.date}</p>

        <img
          src={blog.image}
          className="w-full h-80 object-cover rounded-xl my-8 shadow-lg"
        />

        <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
          {blog.content}
        </div>
      </div>

      <Footer />
    </>
  );
}
