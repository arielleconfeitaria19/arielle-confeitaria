import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Galeria() {
  const [midias, setMidias] = useState([]);
  const [midiaAberta, setMidiaAberta] = useState(null);

  useEffect(() => {
    async function buscarGaleria() {
      const snapshot = await getDocs(collection(db, "galeria"));

      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMidias(lista);
    }

    buscarGaleria();
  }, []);

  if (midias.length === 0) return null;

  return (
    <section
      id="galeria"
      className="py-16 px-4 sm:px-8 md:px-16 bg-[#FDF9F7]"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#6B7A5C] mb-10">
          Galeria
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {midias.map((item) => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded-xl"
            >
              {item.tipo === "image" ? (
                <img
                  src={item.url}
                  alt="Mídia da galeria"
                  className="w-full h-40 sm:h-52 object-cover rounded-xl cursor-pointer hover:scale-105 transition duration-300"
                  onClick={() => setMidiaAberta(item)}
                />
              ) : (
                <>
                  <video
                    src={item.url + "#t=0.1"}
                    poster={item.thumb}
                    className="w-full h-40 sm:h-52 object-cover rounded-xl cursor-pointer"
                    onClick={() => setMidiaAberta(item)}
                    muted
                    playsInline
                    preload="metadata"
                  />

                  {/* Overlay escuro */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-300 pointer-events-none" />

                  {/* Ícone de play */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/60 rounded-full p-3 backdrop-blur-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        viewBox="0 0 24 24"
                        className="w-8 h-8"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {midiaAberta && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setMidiaAberta(null)}
        >
          {/* Botão fechar */}
          <button
            className="absolute top-5 right-5 text-white text-4xl z-50"
            onClick={() => setMidiaAberta(null)}
          >
            ×
          </button>

          {midiaAberta.tipo === "image" ? (
            <img
              src={midiaAberta.url}
              alt="Imagem ampliada"
              className="max-h-[90vh] max-w-[95vw] rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <video
              src={midiaAberta.url}
              controls
              autoPlay
              playsInline
              className="max-h-[90vh] max-w-[95vw] rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </section>
  );
}