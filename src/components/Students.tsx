const students = [
     { id: 1, name: "Musazadə Mehdi", course: "Proqramlaşdırma, İngilis dili", image: "/img/Mehdi.jpeg" },
  { id: 2, name: "Manafov Surxay", course: "Azərbaycan dili, İngilis dili", image: "/img/Surxay.jpeg" },
  { id: 3, name: "Musayev Əli", course: "Proqramlaşdırma, İngilis dili", image: "/img/student3.jpg" },
  { id: 4, name: "Bayramov Fərid", course: "Azərbaycan dili, İngilis dili, Riyaziyyat", image: "/img/Fərid.jpeg" },
  { id: 5, name: "Sultanlı Kəmaləddin", course: "Proqramlaşdırma", image: "/img/Kəmaləddin.jpg" },
    { id: 6, name: "Tağılı Nural", course: "Azərbaycan dili, İngilis dili, Riyaziyyat", image: "/img/Nural.jpeg" },
      { id: 7, name: "Əliyev Uğur", course: "Azərbaycan dili, İngilis dili, Riyaziyyat", image: "/img/Uğur.jpeg" },
    { id: 8, name: "Əliyev Zamin", course: "Rus dili", image: "/img/Nural.jpeg" },
        { id: 9, name: "Musayev Hüseyn", course: "Proqramlaşdırma, İngilis dili", image: "/img/Hüseyn.jpeg" },
        { id: 10, name: "Babayev Amin", course: "Azərbaycan dili, İngilis dili, Riyaziyyat", image: "/img/Amin.jpeg" },
    { id: 11, name: "Əliyev Əbəlfəz", course: "Azərbaycan dili, İngilis dili, Riyaziyyat", image: "/img/Əbəlfəz.jpeg" },
    { id: 12, name: "Həsənov Renad", course: "İngilis dili, Məntiq", image: "/img/Renad.jpeg" },
        { id: 13, name: "Bayramov Tunar", course: "Proqramlaşdırma", image: "/img/Tunar.jpeg" },

];

export default function Students() {
  return (
    <section className="py-12 bg-[#F6F2FF] studentssec">
      <div className="studentsdiv">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#2B1E55] sagirdh">
          Şagirdlərimiz
        </h2>

        <div className="overflow-hidden relative">
          {/* Marquee container */}
          <div className="flex marquee-wrapper sagirdcard">
            {[...students, ...students].map((student, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[100px] h-[300px] bg-white rounded-3xl shadow-lg flex flex-col items-center gap-3 px-3 justify-center border border-[#6839C7]/20 hover:shadow-2xl hover:scale-105 transition-transform duration-300 sagird"
              >
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-16 h-16  object-cover sagirdimg"
                />
                <div className="flex flex-col items-center text-center sagirdtext">
                  <p className="sagirdName text-sm md:text-base font-semibold text-[#2B1E55] truncate sagirdad">
                    {student.name}
                  </p>
                  <span className="sagirdCourse mt-1 text-[10px] md:text-xs font-medium text-[#6839C7] bg-[#6839C7]/10 px-2 py-[2px] rounded-full w-fit text-center">
                    {student.course}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inline animation CSS */}
      <style>
        {`
          .marquee-wrapper {
            display: flex;
            width: max-content;
            animation: marquee 20s linear infinite;
          }

          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </section>
  );
}
