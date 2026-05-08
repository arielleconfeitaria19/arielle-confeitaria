import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  limit,
} from "firebase/firestore";

import { db } from "../firebase";

export default function Galeria() {
  const [midias, setMidias] = useState([]);
  const [midiaAberta, setMidiaAberta] = useState(null);

  useEffect(() => {
    async function buscarGaleria() {
      // Limita quantidade inicial
      const q = query(collection(db, "galeria"), limit(8));

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

  return (
    <section className="py-16 px-4 bg-[#FDF9F7]">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-3xl font-serif text-[#6B7A5C] mb-10">
          Galeria
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {midias.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-xl"
            >
              {item.tipo === "image" ? (
                <img
                  src={item.url}
                  loading="lazy"
                  width="400"
                  height="400"
                  alt="Bolo artesanal"
                  className="w-full h-40 sm:h-52 object-cover rounded-xl cursor-pointer"
                  onClick={() => setMidiaAberta(item)}
                />
              ) : (
                <>
                  <video
                    src={item.url + "#t=0.1"}
                    poster={item.thumb}
                    preload="none"
                    muted
                    playsInline
                    className="w-full h-40 sm:h-52 object-cover rounded-xl cursor-pointer"
                    onClick={() => setMidiaAberta(item)}
                  />

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/60 rounded-full p-3">
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
          {midiaAberta.tipo === "image" ? (
            <img
              src={midiaAberta.url}
              alt="Imagem ampliada"
              className="max-h-[90vh] max-w-[95vw]"
            />
          ) : (
            <video
              src={midiaAberta.url}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="max-h-[90vh] max-w-[95vw]"
            />
          )}
        </div>
      )}
    </section>
  );
}