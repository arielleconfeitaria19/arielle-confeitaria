import { FaWhatsapp } from "react-icons/fa";

export default function Contato() {
  return (
    <section
      id="contato"
      className="bg-[#6B7A5C] text-white py-24 text-center px-6"
    >
      <h2 className="text-4xl font-serif mb-6 tracking-wide">
        Entre em contato
      </h2>

      <p className="mb-10 text-lg opacity-90 max-w-xl mx-auto">
        Solicite seu orçamento personalizado e transforme seu evento
        em uma experiência doce e inesquecível.
      </p>

      <a
        href="https://wa.me/5531991120258?text=Olá! Vim pelo site e gostaria de mais informações."
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 
        bg-[#C97C7C] px-10 py-5 rounded-full 
        hover:scale-105 hover:bg-[#b76d6d] 
        transition duration-300 
        shadow-2xl"
      >
        <FaWhatsapp size={24} />
        Falar no WhatsApp
      </a>
    </section>
  );
}