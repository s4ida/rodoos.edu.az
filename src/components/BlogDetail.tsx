import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import IngilisDiliDers1 from "/src/img/IngilisDiliDers1.jpg";
import IngilisDiliDers2 from "/src/img/IngilisDiliDers2.jpg";
import Azdiliders1 from "/src/img/Azdiliders1.jpg";
import Azdiliders2 from "/src/img/Azdiliders2.jpg";
import riyaziyyatders1 from "/src/img/riyaziyyatders1.jpg";
import riyaziyyatders2 from "/src/img/riyaziyyatders2.jpg";
import rusdiliders from "/src/img/rus-dili-ders.jpeg";
import rusdiliders2 from "/src/img/rus-dili-ders-2.jpeg";
import proqramlasdirma1 from "/src/img/proqramlasdirma-ders1.jpeg";
import proqramlasdirma2 from "/src/img/proqramlasdirma-ders-2.jpeg";
const blogData = [
  {
    id: 1,
    title: "Proqramlaşdırma öyrənməyə necə başlamaq olar?",
    category: "Proqramlaşdırma",
   images: [
      proqramlasdirma1,
    proqramlasdirma2,
    ],
    content: `
Proqramlaşdırma sadəcə kompüterlə danışmaq deyil, həm də öz oyunlarını, animasiyalarını, mini proqramlarını və hətta veb saytlarını yaratmaq deməkdir. Bu, sanki bir sehrbazlıq kimidir – klaviaturaya bir neçə klik etməklə fikirlərini ekranda canlandırırsan! Uşaqlar üçün proqramlaşdırma həm əyləncəli, həm də yaradıcı bir macəra ola bilər.

1. Niyə öyrənmək istədiyini tap
Proqramlaşdırmağa başlamaq üçün ilk addım öz məqsədini tapmaqdır. Niyə öyrənmək istəyirsən? Bu, səni motivasiya edəcək:
Öz oyunun və ya animasiyanı yaratmaq?
Robotları idarə etmək?
Dostların üçün mini proqram və ya veb sayt hazırlamaq?
Maraqlı səbəb tapdıqda öyrənmək daha asan və əyləncəli olur.

2. Sadə dillərlə başla
Uşaqlar üçün proqramlaşdırma dilləri çox mürəkkəb olmamalıdır. Sadə və vizual dillərlə başlamaq ən yaxşı yoldur:
Scratch – bloklarla kod yazmaq, oyun və animasiya yaratmaq üçün əyləncəlidir. Kodları sürüşdürüb birləşdirərək nəticəni dərhal görə bilərsən.
Python – çox sadə və başa düşüləndir. Python ilə oyunlar, sadə proqramlar və hətta kiçik alətlər yaratmaq mümkündür.
JavaScript – veb saytlar yaratmaq və internetdə layihələr göstərmək üçün ideal seçimdir. Kodları dəyişdirərək saytda real dəyişikliklər görmək mümkündür.

3. Hər gün kiçik addımlar at
Proqramlaşdırma bir gecədə öyrənilən şey deyil. Kiçik addımlarla başlamaq ən yaxşı üsuldur:
Hər gün 10-20 dəqiqə məşq et.
Səhvlər etmək normaldır, qorxma!
Hər səhv bir dərsdir və səni daha güclü edir.
Unutma: davamlılıq uğurun açarıdır!

4. Öyrənməni oyun kimi et
Uşaqlar üçün ən yaxşı üsul oyuna çevirməkdir:
Kiçik oyunlar yarat, məsələn, topu hərəkət etdirən və ya düyməyə basanda animasiya göstərən proqram.
Kodları dəyişdir və fərqli nəticələr gör.
Dostlarınla oyunlarını paylaş və birlikdə əylənin.
Beləliklə, öyrənmə həm maraqlı, həm də interaktiv olur.

5. Onlayn resurslardan istifadə et
İnternetdə uşaqlar üçün çoxlu resurslar mövcuddur:
Code.org – interaktiv dərslər və mini oyunlar.
Scratch rəsmi saytı – animasiya və oyun yaratmaq üçün əyləncəli platformadır.
Khan Academy – addım-addım proqramlaşdırma dərsləri.
YouTube – müxtəlif tutorial videoları izləyərək vizual olaraq öyrənmək mümkündür.
Bu resurslar öyrənməyi həm sadə, həm də əyləncəli edir.

6. Kiçik layihələr yarat
Öyrəndiklərini tətbiq etmək çox vacibdir:
Sadə animasiya düzəlt.
Mini oyun və ya veb sayt yarat.
Kiçik layihələr səni daha çox öyrənməyə həvəsləndirir.
Məsələn: bir virtual pişik animasiyası, labirint oyunu və ya öz mini veb saytı layihəsi yaratmaq olar.

7. Səbrli ol və əylən
Kod işləməyə bilər, amma qorxma!
Səhvlər öyrənməyin bir hissəsidir.
Ən vacibi əylənməkdir – proqramlaşdırma həm maraqlı, həm də kreativdir.

8. Dostlarınla birgə layihələr et
Proqramlaşdırmanı dostlarınla birlikdə etmək çox motivasiyaedici olur:
Birlikdə oyunlar və animasiyalar yaradın.
Fərqli ideyaları sınayın və nəticələri müqayisə edin.
Uğurlarını paylaşmaq səni daha çox öyrənməyə həvəsləndirəcək.

9. Öyrənməni gündəlik həyatla birləşdir
Sadə kalkulyator proqramı düzəlt.
Öz mini veb saytını hazırlayaraq maraqlı məlumatları paylaş.
Hər gün kiçik bir kod layihəsi ilə yeni şeylər öyrən.
Beləliklə, proqramlaşdırma yalnız dərs deyil, gündəlik həyatın bir hissəsinə çevrilir.
    `
  },
   {
    id: 2,
    title: "İngilis dilini öyrənməyin 5 effektiv yolu",
    category: "İngilis dili",
    images: [
      IngilisDiliDers1,
      IngilisDiliDers2,
    ],
    content: `
İngilis dili, dünyada ən çox danışılan dillərdən biridir və həm təhsil, həm iş, həm də səyahət imkanları üçün çox vacibdir. Lakin bir çox insan ingilis dilini öyrənməkdə çətinlik çəkir və bunu vaxt aparan bir proses kimi görür. Doğru metodlar və effektiv strategiyalar tətbiq etməklə bu proses çox daha sürətli və asan ola bilər. Aşağıda ingilis dilini tez öyrənməyin 5 effektiv yolunu araşdıracağıq.

1. Hər gün İngilis dilində praktik məşq edin
Dilin sürətlə öyrənilməsi üçün ən vacib amillərdən biri hər gün praktik məşq etməkdir. Beyin müntəzəm olaraq yeni məlumatları işlədikdə yadda saxlayır və dil bacarıqları inkişaf edir.
Sözləri gündəlik öyrənin: Hər gün 10–15 yeni söz öyrənmək və onları cümlələrdə istifadə etmək çox faydalıdır.
Qısa dialoqlar yazın: Özünüz üçün kiçik söhbətlər yazmaq və onları səsli oxumaq danışıq qabiliyyətinizi artırır.
Dəyirmi saatlarla məşq: Məsələn, hər səhər 20 dəqiqə və hər axşam 20 dəqiqə dilə vaxt ayırmaq davamlı inkişaf üçün ideal strategiyadır.

2. Multimedia və texnologiyadan faydalanın
İngilis dilini sürətlə öyrənmək üçün texnologiyadan faydalanmaq çox effektivdir. Telefon və kompüter vasitəsilə dil bacarıqlarınızı inkişaf etdirə bilərsiniz.
Videolar və filmlər izləyin: İngilis dilində filmlər, seriallar və YouTube videoları izləmək həm söz bazanızı artırır, həm də düzgün tələffüzü öyrədir.
Dinləmə tətbiqləri: Podcastlar və audio kitablar eşitmə bacarıqlarını gücləndirir. Məsələn, “BBC Learning English” və ya “Duolingo Stories” kimi tətbiqlər çox faydalıdır.
Oyunlar və interaktiv dərsliklər: Dil oyunları öyrənməni əyləncəli edir və motivasiyanı artırır.

3. Söhbət etmək və danışmaqdan qorxmayın
Danışıq bacarıqları İngilis dilini öyrənmənin ən çətin, amma ən vacib hissəsidir. Bir çox insan səhv etməkdən qorxaraq danışıqdan uzaq durur. Bu isə öyrənmə prosesini gecikdirir.
Dostlarla praktik: İngilis dilində danışan dostlar tapmaq və ya dil mübadiləsi proqramlarına qoşulmaq sürətli öyrənməyə kömək edir.
Süni dialoqlar: Özünüzlə və ya qeydə alınmış səsinizlə dialoqlar qurmaq da danışıq qabiliyyətinizi inkişaf etdirir.
Səhvlərdən qorxmayın: Səhvlər öyrənmənin təbii bir hissəsidir. Onlardan qorxmadan danışmaq bacarıqları sürətlə artırır.

4. Qrammatika və söz bazasını balanslı öyrənin
Sürətli öyrənmək yalnız söz öyrənmək deyil, həm də qrammatikanı və cümlə quruluşlarını bilməkdir. Lakin qrammatikaya çox vaxt sərf etmək öyrənməyi yavaşlada bilər.
Əsas qaydalar: Ən çox istifadə olunan zaman formaları (Present Simple, Past Simple, Future Simple) ilə başlamaq yetərlidir.
Sözləri mövzular üzrə öyrənin: Məsələn, yeməklər, ailə, səyahət kimi mövzular üzrə sözləri öyrənmək daha faydalıdır.
Cümlə qurma təcrübəsi: Hər öyrəndiyiniz sözlə cümlə qurmaq qrammatikanın tətbiqini təmin edir.

5. Motivasiyanı və hədəfi qoruyun
Hər kəs üçün ingilis dili öyrənmək çətin bir prosesdir. Motivasiya və məqsəd olmadan bu proses çox uzun çəkə bilər.
Aydın məqsəd qoyun: Məsələn, “6 ayda səviyyəmi A2-dən B1-ə çatdırmaq” kimi konkret məqsəd.
Kiçik mərhələlər: Böyük hədəfi kiçik addımlara bölmək öyrənməni asanlaşdırır.
Uğurlarınızı qeyd edin: Hər öyrəndiyiniz 50 yeni söz və ya 5 danışıq məşqi sizi daha da həvəsləndirəcək.
    `
  },
  {
    id: 3,
    title: "Rus dilini sıfırdan necə öyrənmək olar?",
    category: "Rus dili",
       images: [
      rusdiliders,
      rusdiliders2,
    ],
    content: `
Rus dili, dünya miqyasında geniş yayılmış və həm iş, həm təhsil, həm də səyahət imkanları üçün çox faydalı bir dildir. Lakin sıfırdan öyrənməyə başlayanlar üçün bu proses bəzən çətin və uzun görünə bilər. Doğru metodlar, planlı strategiya və davamlı təcrübə ilə rus dilini öyrənmək sürətli və effektiv ola bilər. Aşağıda sıfırdan rus dilini öyrənməyin yollarını ətraflı şəkildə araşdıracağıq.

1. Əlifbadan başlamaq və düzgün tələffüz öyrənmək
Rus dili Kiril əlifbası ilə yazılır, bu səbəbdən əlifba və tələffüzü öyrənmək öyrənmənin ilk və ən vacib addımıdır.
Kiril əlifbasını öyrənin: Hər hərfi tanıyın və yazmağı öyrənin.
Səsləri düzgün tələffüz edin: Rus dilində hərflərin tələffüzü ingilis və ya Azərbaycan dilindən fərqlidir. Səsli dərsliklər və videolarla düzgün tələffüz məşqi edin.
Praktik məşqlər: Hər gün 5–10 dəqiqə əlifba və sadə sözlərin tələffüzü ilə məşğul olun.
Bu mərhələdə məqsəd yalnız oxuma və yazma bacarığını formalaşdırmaqdır. Tələffüz düzgün olmasa, sonrakı mərhələlərdə danışıqda çətinlik yarana bilər.

2. Əsas söz bazasını öyrənmək
Söz bazası dili öyrənməyin əsas hissəsidir. Sıfırdan başlayanda gündəlik istifadə olunan sözləri və ifadələri öyrənmək vacibdir.
Əsas mövzular üzrə sözlər: Salamlaşmalar, rəqəmlər, rənglər, ailə, yemək, səyahət kimi gündəlik mövzuları öyrənin.
Kartlar və tətbiqlər: Anki, Quizlet kimi tətbiqlərlə sözləri təkrarlamaq yadda saxlamağı asanlaşdırır.
Sözləri cümlələrdə istifadə edin: Yalnız sözləri öyrənmək kifayət deyil, onları sadə cümlələrdə işlətmək daha faydalıdır.

Məsələn:
Здравствуйте! (Salam!)
Я учусь. (Mən oxuyuram.)
Спасибо! (Təşəkkür edirəm!)

3. Qrammatikanın əsaslarını öyrənmək
Rus dili qrammatikası bir az mürəkkəbdir, amma sıfırdan öyrənənlər üçün əsas qaydaları bilmək yetərlidir.
İsimlərin cinsləri: Rus dilində isimlər kişi, qadın və orta cinsdə olur.
Sadə zaman formaları: Present (indiki zaman), Past (keçmiş zaman), Future (gələcək zaman) ilə başlamaq.
Sadə cümlə quruluşu: Subyekt + fel + obyekt kimi sadə cümlələr yaratmaq.

Məsələn:
Я читаю книгу. (Mən kitab oxuyuram.)
Он гулял в парке. (O, parkda gəzir.)
Qrammatikanı çox dərin öyrənmədən, praktik cümlələr qurmaq daha faydalıdır.

4. Dinləmə və danışıq bacarıqlarını inkişaf etdirmək
Sözləri və qrammatikanı öyrəndikdən sonra danışıq və dinləmə bacarıqlarına diqqət yetirmək vacibdir.
Audio və videolar: Rus dilində filmlər, seriallar və podcastlar dinləmək eşitmə bacarığını artırır.
Söhbət praktikası: Dil mübadiləsi proqramları, onlayn dərslər və ya rus danışan dostlarla ünsiyyət çox faydalıdır.
Səhvlərdən qorxmayın: Danışıq zamanı səhvlər etmək normaldır. Onlardan öyrənmək dil öyrənmənin bir hissəsidir.

5. Davamlılıq və motivasiyanı qorumaq
Sıfırdan dil öyrənmək səbr və davamlılıq tələb edir. Motivasiya olmadan proses yavaş və çətin görünə bilər.
Aydın məqsəd qoyun: Məsələn, “3 ayda gündəlik söhbətləri başa düşmək” kimi konkret məqsəd.
Kiçik mərhələlər: Böyük məqsədləri kiçik addımlara bölmək öyrənməni asanlaşdırır.
Uğurları qeyd edin: Hər öyrəndiyiniz 10 yeni söz və ya bir danışıq məşqi motivasiyanı artırır.
    `
  },
   {
    id: 4,
    title: "Azərbaycan dilində bacarıqlı yazı və danışıq necə inkişaf etdirilir?",
    category: "Azərbaycan dili",
    images: [
         Azdiliders1,
      Azdiliders2,
    ],
    content: `
Bacarıqlı yazı və danışıq qabiliyyəti həyatın hər sahəsində uğur qazanmaq üçün vacibdir. Təhsil, iş mühiti, sosial həyat və şəxsi inkişaf üçün düzgün və təsirli ünsiyyət qurmaq lazımdır. Azərbaycan dilində yazı və danışıq bacarıqlarını inkişaf etdirmək üçün müəyyən metodlar və davamlı məşqlər tətbiq edilməlidir. Bu məqalədə sizə bacarıqlı yazı və danışıq üçün praktik və effektiv yolları təqdim edirik.

1. Daha çox oxuyun və müxtəlif mətnlərlə tanış olun
Oxumaq yazı və danışıq bacarıqlarının təməlini təşkil edir. İnsan nə qədər çox oxuyursa, dil hissi, söz bazası və ifadə tərzi bir o qədər zəngin olur.
Müxtəlif mövzular: Tarix, elm, bədii ədəbiyyat, xəbərlər və jurnal məqalələri oxuyun. Hər mövzu yeni sözlər və ifadələr öyrədir.
Klassik və müasir ədəbiyyat: Məsələn, Nizami Gəncəvi, Cəlil Məmmədquluzadə kimi klassiklərdən tutmuş müasir yazıçılara qədər fərqli üslubları oxumaq yazı və danışıq tərzinizi zənginləşdirir.
Qeyd aparın: Oxuduğunuz yeni sözləri, ifadələri və cümlə quruluşlarını qeyd edin. Sonra onları yazı və danışıqda təcrübədə istifadə edin.
Oxuma prosesi zamanı yalnız sözləri mənimsəmək kifayət deyil, həm də müəllifin üslubunu, cümlə quruluşunu və fikir ifadə etmə üsullarını öyrənmək çox önəmlidir.

2. Gündəlik yazı vərdişi yaradın
Yazmaq bacarıqları yalnız praktik məşqlə inkişaf edir. Müntəzəm yazı öyrənməyi sürətləndirir və düşüncələri aydın ifadə etməyi təmin edir.
Jurnal yazmaq: Hər gün qısa mətni yazmaq, hissləri və gündəlik hadisələri ifadə etmək yazı qabiliyyətinizi artırır.
Məktub və e-poçt yazmaq: Dostlara, müəllimlərə və ya iş yoldaşlarına yazmaq düzgün cümlə quruluşunu təcrübə etmək üçün faydalıdır.
Yazıları yoxlayın: Yazdığınız mətnləri oxuyun, səhvləri tapın və onları düzəldin. Bu, dilin düzgün istifadəsini öyrədir.
Fərqli janrlar: Məqalə, esse, hekayə, bədii mətn və ya təqdimat yazmaq üslubunuzu genişləndirir və fərqli fikirləri ifadə etməyə imkan verir.
Praktik məşqlər yazı bacarıqlarını təkcə söz və qrammatika baxımından deyil, həm də üslub və ifadə tərzi baxımından inkişaf etdirir.

3. Danışıq bacarıqlarını gündəlik məşq edin
Danışıq bacarığı sözləri düzgün seçmək, intonasiya və fikri aydın çatdırmaqla inkişaf edir.
Ayna qarşısında danışmaq: Özünüzlə danışmaq və ya nitqləri təkrar etmək üslubu, mimikaları və jestləri inkişaf etdirir.
Söhbət praktikası: Dostlar, müəllimlər, ailə üzvləri və ya dil klublarında aktiv ünsiyyət danışığı gücləndirir.
Səhvlərdən qorxmamaq: Danışıq zamanı səhv etmək normaldır. Əsas odur ki, fikir aydın və məntiqli ifadə olunsun.
Nitq mətnləri: Tanınmış çıxışların nitqlərini oxuyun, təqlid edin və səsinizi qeydə alın. Sonra özünüzü qiymətləndirin.

4. Qrammatika və düzgün ifadə üsullarını öyrənin
Dilin düzgün və təsirli istifadəsi yazı və danışığı daha peşəkar göstərir.
Qrammatik qaydalar: Cümlə quruluşu, zaman formaları, fel formaları, isim və sifət halları yazı və danışıqda vacibdir.
Sinonimlər və müxtəlif ifadələr: Eyni sözləri təkrar etməmək və müxtəlif ifadələr işlətmək bacarıqlı yazı və danışıq üçün önəmlidir.
Mətnləri analiz edin: Peşəkar yazı və nitqləri oxuyaraq, cümlələrin necə qurulduğunu və ifadələrin necə işlədiyini öyrənin.
Sadə və aydın ifadə: Düşüncələrinizi qısa və konkret cümlələrlə ifadə etmək oxuyan və dinləyən üçün anlaşılan olur.

5. Dinləmə və təqlid bacarıqlarını inkişaf etdirin
Dinləmə bacarığı danışıqda təbii və axıcı üslub üçün vacibdir.
Radio, TV və podkastlar: Azərbaycan dilində xəbərlər, verilişlər və podkastlar dinləmək düzgün tələffüz və ifadə üslubunu öyrədir.
Nitqləri təqlid edin: Dinlədiyiniz nitqləri eyni intonasiya və sürətlə təkrar etmək danışıq axıcılığını artırır.
Təhlil edin: Nitqlərdə hansı sözlərin və ifadələrin işlədiyini qeyd etmək həm yazı, həm də danışıq üçün faydalıdır.

6. Davamlılıq, özünü qiymətləndirmə və motivasiya
Bacarıqlı yazı və danışıq bir gündə yaranmır. Davamlı məşq, təcrübə və motivasiya vacibdir.
Kiçik və real məqsədlər: Hər gün 5 yeni söz öyrənmək, 1 səhifə yazmaq və ya 10 dəqiqə danışıq məşqi etmək kimi addımlar motivasiyanı artırır.
Özünü qiymətləndirmək: Yazılarınızı və nitqlərinizi oxuyub səhvləri tapmaq və düzəltmək öyrənməyə kömək edir.
Uğurları qeyd etmək: Kiçik irəliləyişlər motivasiyanı qoruyur və öyrənməyi əyləncəli edir.
Təcrübə və təhlil: Yazı və danışıq bacarıqlarınızı müxtəlif kontekstlərdə sınamaq – təqdimat, debat, müsahibə – sizi daha da inkişaf etdirir.
    `
  },
   {
    id: 5,
    title: "Riyaziyyatı başa düşmək və həll etmək yolları",
    category: "Riyaziyyat",
    images: [
      riyaziyyatders1,
      riyaziyyatders2,
    ],
    content: `
Riyaziyyat, yalnız məktəblərdə deyil, həyatın hər sahəsində vacib bir fəndir. Lakin bir çox insan üçün riyaziyyat çətin və mürəkkəb görünür. Əslində, doğru yanaşmalar və metodlar tətbiq edilərsə, riyaziyyatı başa düşmək və problemləri həll etmək daha asan olur. Bu məqalədə riyaziyyatı anlamaq və uğurla həll etmək üçün əsas yolları araşdıracağıq.

1. Əsas anlayışları möhkəmləndirin
Riyaziyyatı başa düşmək üçün ilk addım əsas anlayışları öyrənmək və onları möhkəmləndirməkdir.
Əsas qaydalar və prinsiplər: Toplama, çıxma, vurma, bölmə, faizlər, tənliklər kimi əsas anlayışları yaxşı bilmək çox vacibdir.
Konsepsiyaları vizual şəkildə öyrənin: Məsələn, qrafiklər, şəkillər, sxemlər riyaziyyatı daha asan başa düşməyə kömək edir.
Sadə nümunələrlə məşq: Hər yeni mövzuya başlamazdan əvvəl sadə nümunələr üzərində işləmək anlayışı möhkəmləndirir.
Əsas anlayışlar güclü olduqda mürəkkəb problemləri həll etmək asanlaşır.

2. Problemləri addım-addım həll edin
Riyaziyyat problemləri tez-tez bir neçə mərhələdən ibarətdir. Onları addım-addım həll etmək uğur üçün vacibdir.
Məsələni diqqətlə oxuyun: Hər detalı anlamaq üçün məsələnin bütün hissələrini diqqətlə oxuyun.
Plan qurun: Problemi həll etmək üçün hansı qaydaları və formulları istifadə edəcəyinizi müəyyən edin.
Hər addımı yazın: Düşüncələrinizi kağıza yazmaq səhvləri azaldır və prosesin aydın görünməsini təmin edir.
Nəticəni yoxlayın: Cavabın doğru olub olmadığını təkrar yoxlayın.

3. Məşqlər və davamlı təkrar
Riyaziyyatı anlamağın ən effektiv yollarından biri çoxlu məşqlər etməkdir.
Gündəlik məşq: Hər gün riyaziyyatla məşğul olmaq bacarıqları gücləndirir.
Fərqli tipli məsələlər: Müxtəlif tipli məsələlər üzərində işləmək anlayışı genişləndirir və tətbiq bacarığını artırır.
Səhvlərdən öyrənin: Hər səhv öyrənmək üçün bir fürsətdir. Nəticəni yanlış hesab etmisinizsə, səhvi tapın və anlayışı möhkəmləndirin.
Məşqlər təcrübə gətirir və problemləri daha sürətli həll etməyə imkan verir.

4. Riyaziyyatı həyatla əlaqələndirin
Riyaziyyatı real həyatla əlaqələndirmək onu daha maraqlı və anlaşılan edir.
Gündəlik məsələlər: Məsələn, alış-verişdə hesablamalar, tariflər, məsafə və zaman hesablamaları riyaziyyatı praktik edir.
Məntiqi oyunlar və bulmacalar: Sudoku, şahmat və digər riyazi oyunlar məntiqi və problem həll etmə bacarıqlarını inkişaf etdirir.
Eksperiment və təcrübələr: Real həyat nümunələri üzərində riyazi hesablamalar aparmaq anlayışı möhkəmləndirir.
Həyatla əlaqə qurmaq riyaziyyatı daha əlçatan və əyləncəli edir.

5. Dərs və resurslardan effektiv istifadə
Riyaziyyatı başa düşmək üçün düzgün resurslardan faydalanmaq vacibdir.
Müəllim və müəllim köməyi: Sual vermək və izah almaq çətin mövzuları anlamağa kömək edir.
Kitablar və dərsliklər: Ətraflı izahlar, nümunələr və tapşırıqlar öyrənməni asanlaşdırır.
Online resurslar: Video dərslər, riyazi forumlar və tətbiqlər anlayışı möhkəmləndirir.
Müxtəlif mənbələrdən faydalanmaq mövzuları daha sürətli başa düşməyə imkan verir.

6. Motivasiya və səbr
Riyaziyyatı başa düşmək və həll etmək səbr və davamlılıq tələb edir.
Kiçik məqsədlər qoyun: Məsələn, gündə 5 məsələ həll etmək və ya yeni mövzunu başa düşmək kimi addımlar motivasiyanı artırır.
Uğurları qeyd edin: Hər uğurlu həll öyrənməyə həvəsi artırır.
Pozitiv düşüncə: Riyaziyyatın çətin olduğunu düşünmək əvəzinə, onu öyrənmək üçün fürsət kimi qiymətləndirmək vacibdir.
    `
  },
];

export default function BlogDetail() {
  const { id } = useParams();
  const blog = blogData.find((b) => b.id === Number(id));

  if (!blog)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        Blog tapılmadı
      </h2>
    );

  return (
    <>
      <Header />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        {/* Şəkillər */}
        <div className="images-row">
          {blog.images.map((img, index) => (
            <div className="image-wrapper" key={index}>
              <img
                src={img}
                alt={`${blog.title} ${index + 1}`}
                className="blog-image"
              />
            </div>
          ))}
        </div>

        {/* Məzmun */}
        <div className="blog-content">
          <span className="category">{blog.category}</span>

          <h1 className="title">{blog.title}</h1>


          <div className="content">{blog.content}</div>
        </div>
      </main>

      <Footer />

      {/* CSS */}
      <style>
        {`
          .images-row {
            display: flex;
            flex-direction: row;
            gap: 20px;
            margin-top: 80px;
            margin-bottom: 40px;
            box-sizing: border-box;
          }

          .image-wrapper {
            width: calc(50% - 10px);
            overflow: hidden; 
            border-radius: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .blog-image {
            width: 100%;
            height: auto; /* Proportional resizing */
            max-height: 350px; /* Desktop max height */
            object-fit: contain; /* Heç bir hissəsi kəsilməsin */
            transition: transform 0.3s;
          }

          .blog-image:hover {
            transform: scale(1.05);
          }

          .blog-content .category {
            display: inline-block;
            background-color: #DBEAFE;
            color: #1E3A8A;
            padding: 5px 12px;
            border-radius: 9999px;
            font-weight: 600;
            font-size: 14px;
          }

          .blog-content .title {
            font-size: 36px;
            font-weight: 700;
            color: #111827;
            margin: 20px 0 10px;
            line-height: 1.2;
          }

          .blog-content .date {
            color: #6B7280;
            margin-bottom: 30px;
          }

          .blog-content .content {
            font-size: 18px;
            line-height: 1.8;
            color: #374151;
            white-space: pre-line;
          }

          /* Kiçik tablet və telefon: ≤650px */
          @media (max-width: 650px) {
            .images-row {
              flex-direction: column;
            }

            .image-wrapper {
              width: 100%;
            }

            .blog-image {
              max-height: 450px; /* alt-üst stacked olunca bir az böyük olsun */
            }

            .blog-content .title {
              font-size: 28px;
            }

            .blog-content .content {
              font-size: 16px;
            }
          }

          /* Mobil: ≤420px */
          @media (max-width: 420px) {
            .blog-image {
              max-height: 220px;
            }
          }
        `}
      </style>
    </>
  );
}
