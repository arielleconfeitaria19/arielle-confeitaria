import Header from "../components/Header";
import Hero from "../components/Hero";
import Produtos from "../components/Produtos";
import Galeria from "../components/Galeria";
import Contato from "../components/Contato";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import Sobre from "../components/Sobre";
import Depoimentos from "../components/Depoimentos";
import Promocoes from "../components/Promocoes";
import ComoPedir from "../components/ComoPedir";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Sobre />
      <Promocoes />
      <ComoPedir />
      <Produtos />
      <Galeria />
      <Depoimentos />
      <Contato />
      <WhatsAppFloat />
      <Footer />
    </div>
  );
}