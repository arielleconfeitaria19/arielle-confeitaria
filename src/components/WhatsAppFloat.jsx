import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/5531991120258?text=Olá! Vim pelo site e gostaria de mais informações."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 
      bg-[#C97C7C] text-white 
      p-4 rounded-full 
      shadow-2xl 
      hover:scale-110 
      transition duration-300 
      z-50"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}