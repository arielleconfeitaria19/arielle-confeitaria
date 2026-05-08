import content from "../content/home.json";
import banner from "../assets/banner1.webp";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative h-[80vh] sm:h-[85vh] md:h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Imagem otimizada */}
      <img
        src={banner}
        alt="Bolo artesanal da Arielle Confeitaria"
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Conteúdo */}
      <div className="relative z-10 text-center text-white max-w-3xl px-4">
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