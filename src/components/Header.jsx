import { useState } from "react";
import { FaInstagram, FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#F5EFE6]/90 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <h1 className="text-lg md:text-2xl font-serif text-[#6B7A5C]">
          Arielle Confeitaria
        </h1>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-[#6B7A5C]">
          <a href="#inicio">Início</a>
          <a href="#sobre" className="hover:text-[#C97C7C] transition">Sobre</a>
          <a href="#galeria" className="hover:text-[#C97C7C] transition">Galeria</a>
          <a href="#contato" className="hover:text-[#C97C7C] transition">Contato</a>
        </nav>

        {/* Ícones direita */}
        <div className="flex items-center gap-4">

          <a
            href="https://instagram.com/arielleconfeitaria"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C97C7C] p-2 rounded-full 
            hover:scale-110 transition duration-300 shadow-md"
          >
            <FaInstagram size={18} className="text-white" />
          </a>

          {/* Botão Mobile */}
          <button
            className="md:hidden text-[#6B7A5C] text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-[#F5EFE6] px-6 pb-6 flex flex-col gap-4 text-[#6B7A5C] font-medium">
          <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
          <a href="#galeria" onClick={() => setMenuOpen(false)}>Galeria</a>
          <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
        </div>
      )}
    </header>
  );
}