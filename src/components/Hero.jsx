import content from "../content/home.json";
import banner from "../assets/banner1.jpg";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative h-[80vh] sm:h-[85vh] md:h-screen bg-cover bg-center flex items-center justify-center px-4 pt-28"
      style={{ backgroundImage: `url(${banner})` }}
    >
      {/* Overlay elegante */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative text-center text-white max-w-3xl px-4">
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-serif mb-4 sm:mb-6 tracking-wide leading-tight">
          {content.titulo}
        </h2>

        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90">
          {content.descricao}
        </p>

        <a
          href="#contato"
          className="inline-block bg-[#C47A8A] px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-full hover:scale-105 hover:bg-[#b76d6d] transition duration-300 shadow-xl"
        >
          Quero meu bolo
        </a>
      </div>
    </section>
  );
}