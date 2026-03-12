import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [imagemAberta, setImagemAberta] = useState(null);

  useEffect(() => {
    async function buscarProdutos() {
      try {
        const q = query(
          collection(db, "produtos"),
          where("ativo", "==", true),
          orderBy("createdAt", "desc"),
        );

        const snapshot = await getDocs(q);

        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProdutos(lista);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setCarregando(false);
      }
    }

    buscarProdutos();
  }, []);

  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#6B7A5C] mb-10">
          Nossos Produtos
        </h3>

        {carregando && <p className="text-gray-500">Carregando produtos...</p>}

        {!carregando && produtos.length === 0 && (
          <p className="text-gray-500">
            Em breve teremos novidades deliciosas 🍰
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="bg-[#FDF9F7] rounded-2xl shadow-md overflow-hidden 
                         hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >
              <img
                src={produto.imagemUrl}
                alt={produto.nome}
                className="w-full h-60 object-cover cursor-pointer"
                onClick={() => setImagemAberta(produto.imagemUrl)}
              />

              <div className="p-6 text-left">
                <p className="text-lg font-semibold text-gray-800">
                  {produto.nome}
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  {produto.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {imagemAberta && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setImagemAberta(null)}
        >
          <span
            className="absolute top-5 right-8 text-white text-4xl cursor-pointer"
            onClick={() => setImagemAberta(null)}
          >
            ×
          </span>

          <img
            src={imagemAberta}
            alt="Imagem ampliada"
            className="max-h-[90%] max-w-[90%] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
