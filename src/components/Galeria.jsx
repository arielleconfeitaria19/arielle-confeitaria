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
    <section id="galeria" className="py-16 px-4 sm:px-8 md:px-16 bg-[#FDF9F7]">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#6B7A5C] mb-10">
          Galeria
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {midias.map((item) => (
            <div key={item.id}>
              {item.tipo === "image" ? (
                <img
                  src={item.url}
                  alt="Mídia da galeria"
                  className="w-full h-40 sm:h-52 object-cover rounded-xl cursor-pointer"
                  onClick={() => setMidiaAberta(item)}
                />
              ) : (
                <video
                  src={item.url}
                  className="w-full h-40 sm:h-52 object-cover rounded-xl cursor-pointer"
                  onClick={() => setMidiaAberta(item)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {midiaAberta && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setMidiaAberta(null)}
        >
          <span
            className="absolute top-5 right-8 text-white text-4xl cursor-pointer"
            onClick={() => setMidiaAberta(null)}
          >
            ×
          </span>

          {midiaAberta.tipo === "image" ? (
            <img
              src={midiaAberta.url}
              alt="Imagem ampliada"
              className="max-h-[90%] max-w-[90%] rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <video
              src={midiaAberta.url}
              controls
              autoPlay
              className="max-h-[90%] max-w-[90%] rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </section>
  );
}
