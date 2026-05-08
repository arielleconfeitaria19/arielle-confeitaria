import { useEffect, useState } from "react";
import { collection, getDocs, query, limit } from "firebase/firestore";

import { db } from "../firebase";

export default function Galeria() {
  const [midias, setMidias] = useState([]);
  const [midiaAberta, setMidiaAberta] = useState(null);
  const [mostrarTodas, setMostrarTodas] = useState(false);

  useEffect(() => {
    async function buscarGaleria() {
      const q = query(collection(db, "galeria"), limit(20));

      const snapshot = await getDocs(q);

      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMidias(lista);
    }

    buscarGaleria();
  }, []);

  if (midias.length === 0) return null;

  // Exibe apenas 8 inicialmente
  const midiasExibidas = mostrarTodas ? midias : midias.slice(0, 8);

  return (
    <section id="galeria" className="py-16 px-4 bg-[#FDF9F7]">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-3xl font-serif text-[#6B7A5C] mb-10">Galeria</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {midiasExibidas.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-xl group"
            >
              {item.tipo === "image" ? (
                <img
                  src={item.url}
                  loading="lazy"
                  width="400"
                  height="400"
                  alt="Bolo artesanal"
                  className="w-full h-40 sm:h-52 object-cover rounded-xl cursor-pointer hover:scale-105 transition duration-300"
                  onClick={() => setMidiaAberta(item)}
                />
              ) : (
                <div
                  className="relative w-full h-40 sm:h-52 cursor-pointer"
                  onClick={() => setMidiaAberta(item)}
                >
                  {/* Thumbnail do vídeo */}
                  <img
                    src={item.thumb || "/video-thumb.jpg"}
                    loading="lazy"
                    alt="Preview do vídeo"
                    className="w-full h-full object-cover rounded-xl"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition duration-300 rounded-xl" />

                  {/* Ícone Play */}
                  <div className="absolute inset-0 flex items-center justify-center">
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
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Botão Ver Mais */}
        {!mostrarTodas && midias.length > 8 && (
          <button
            onClick={() => setMostrarTodas(true)}
            className="mt-10 bg-[#C47A8A] text-white px-8 py-3 rounded-full hover:bg-[#b76d6d] transition duration-300 shadow-lg"
          >
            Ver mais
          </button>
        )}
      </div>

      {/* Modal */}
      {midiaAberta && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
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
            <div
              className="w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Estilo Reels */}
              <video
                src={midiaAberta.url}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="
                  h-[90vh]
                  w-auto
                  max-w-[95vw]
                  rounded-2xl
                  object-contain
                  shadow-2xl
                "
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
