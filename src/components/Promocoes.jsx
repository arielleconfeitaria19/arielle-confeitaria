import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import ImageModal from "../components/ImageModal";

export default function Promocoes() {
  const [promocoes, setPromocoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [imagemAberta, setImagemAberta] = useState(null);

  useEffect(() => {
    async function buscarPromocoes() {
      try {
        const q = query(
          collection(db, "promocoes"),
          where("ativo", "==", true),
          orderBy("createdAt", "desc"), // 🔥 mais recentes primeiro
        );

        const querySnapshot = await getDocs(q);

        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPromocoes(lista);
      } catch (error) {
        console.error("Erro ao buscar promoções:", error);
      } finally {
        setCarregando(false);
      }
    }

    buscarPromocoes();
  }, []);

  if (carregando) {
    return (
      <section id="promocoes" className="py-24 text-center">
        <p className="text-gray-500">Carregando promoções...</p>
      </section>
    );
  }

  if (!promocoes.length) {
    return (
      <section id="promocoes" className="py-24 text-center">
        <h3 className="text-3xl font-serif text-[#6B7A5C]">
          Promoções Especiais
        </h3>
        <p className="mt-6 text-gray-500">
          Em breve teremos novidades deliciosas 🍰
        </p>
      </section>
    );
  }

  return (
    <section id="promocoes" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-3xl md:text-4xl font-serif text-[#6B7A5C] mb-16">
          Promoções Especiais
        </h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {promocoes.map((promo) => (
            <div
              key={promo.id}
              className="bg-[#FFF6F2] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500"
            >
              {promo.imagemUrl && (
                <img
                  src={promo.imagemUrl}
                  alt={promo.titulo}
                  className="w-full h-64 object-cover"
                  onClick={() => setImagemAberta(promo.imagemUrl)}
                />
              )}

              <div className="p-6">
                <h4 className="text-xl font-semibold text-[#6B7A5C] mb-2">
                  {promo.titulo}
                </h4>

                <p className="text-gray-600 text-sm">{promo.descricao}</p>

                {promo.preco && (
                  <p className="text-lg font-bold text-[#C47A8A] mt-4">
                    R$ {promo.preco.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          ))}
          
        </div>
        <ImageModal
            imagem={imagemAberta}
            fechar={() => setImagemAberta(null)}
          />
      </div>
    </section>
  );
}
