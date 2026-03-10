import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Depoimentos() {
  const [depoimentos, setDepoimentos] = useState([]);
  const [imagemAberta, setImagemAberta] = useState(null);

  useEffect(() => {
    buscarDepoimentos();
  }, []);

  async function buscarDepoimentos() {
    const snapshot = await getDocs(collection(db, "depoimentos"));

    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setDepoimentos(lista.filter((dep) => dep.ativo));
  }

  return (
    <section className="depoimentos">
      <h2 className="titulo-depoimentos">
        O que nossos clientes dizem
      </h2>

      <div className="lista-depoimentos">
        {depoimentos.map((dep) => (
          <div key={dep.id} className="card-depoimento">

            <img
              src={dep.fotoBolo}
              alt="Foto do bolo"
              className="foto-bolo"
              onClick={() => setImagemAberta(dep.fotoBolo)}
            />

            <h4>{dep.nome}</h4>

            <p>{dep.comentario}</p>

            {dep.instagram && (
              <a
                href={`https://instagram.com/${dep.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-instagram"
              >
                @{dep.instagram.replace("@", "")}
              </a>
            )}

          </div>
        ))}
      </div>

      {imagemAberta && (
        <div
          className="modal"
          onClick={() => setImagemAberta(null)}
        >

          <span
            className="fechar"
            onClick={() => setImagemAberta(null)}
          >
            ×
          </span>

          <img
            className="modal-imagem"
            src={imagemAberta}
            alt="Foto ampliada"
            onClick={(e) => e.stopPropagation()}
          />

        </div>
      )}
    </section>
  );
}