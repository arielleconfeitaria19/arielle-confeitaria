import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import ProdutosAdmin from "../components/admin/ProdutosAdmin";
import PromocoesAdmin from "../components/admin/PromocoesAdmin";
import GaleriaAdmin from "../components/admin/GaleriaAdmin";
import DepoimentosAdmin from "../components/admin/DepoimentosAdmin";

export default function Admin() {
  const navigate = useNavigate();

  const [abaAtiva, setAbaAtiva] = useState("produtos");

  const [produtos, setProdutos] = useState([]);
  const [promocoes, setPromocoes] = useState([]);
  const [midias, setMidias] = useState([]);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemArquivo, setImagemArquivo] = useState(null);

  const [tituloPromo, setTituloPromo] = useState("");
  const [descricaoPromo, setDescricaoPromo] = useState("");
  const [precoPromo, setPrecoPromo] = useState("");
  const [imagemPromoArquivo, setImagemPromoArquivo] = useState(null);

  const [arquivoMidia, setArquivoMidia] = useState(null);
  const [depoimentos, setDepoimentos] = useState([]);

  useEffect(() => {
    buscarProdutos();
    buscarPromocoes();
    buscarGaleria();
    buscarDepoimentos();
  }, []);

  async function handleLogout() {
    await signOut(auth);
    navigate("/login");
  }

  // ================= CLOUDINARY =================
  async function uploadImagem(arquivo) {
    const formData = new FormData();
    formData.append("file", arquivo);
    formData.append("upload_preset", "site_upload");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/doanpfosl/image/upload",
      { method: "POST", body: formData },
    );

    const data = await response.json();
    return data.secure_url;
  }

  async function uploadMidia(arquivo) {
    const formData = new FormData();
    formData.append("file", arquivo);
    formData.append("upload_preset", "site_upload");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/doanpfosl/auto/upload",
      { method: "POST", body: formData },
    );

    const data = await response.json();
    return { url: data.secure_url, tipo: data.resource_type };
  }

  // ================= BUSCAR =================
  async function buscarProdutos() {
    const snapshot = await getDocs(collection(db, "produtos"));
    setProdutos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  }

  async function buscarPromocoes() {
    const snapshot = await getDocs(collection(db, "promocoes"));
    setPromocoes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  }

  async function buscarGaleria() {
    const snapshot = await getDocs(collection(db, "galeria"));
    setMidias(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  }

  async function buscarDepoimentos() {
    const snapshot = await getDocs(collection(db, "depoimentos"));
    setDepoimentos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  }

  // ================= PRODUTOS =================
  async function handleCadastrarProduto(e) {
    e.preventDefault();
    if (!imagemArquivo) return alert("Selecione uma imagem");

    const imagemUrl = await uploadImagem(imagemArquivo);

    await addDoc(collection(db, "produtos"), {
      nome,
      descricao,
      imagemUrl,
      ativo: true,
      createdAt: new Date(),
    });

    setNome("");
    setDescricao("");
    setImagemArquivo(null);
    buscarProdutos();
  }

  async function excluirProduto(id) {
    await deleteDoc(doc(db, "produtos", id));
    buscarProdutos();
  }

  // ================= PROMOÇÕES =================
  async function handleCadastrarPromocao(e) {
    e.preventDefault();
    if (!imagemPromoArquivo) return alert("Selecione uma imagem");

    const imagemUrl = await uploadImagem(imagemPromoArquivo);

    await addDoc(collection(db, "promocoes"), {
      titulo: tituloPromo,
      descricao: descricaoPromo,
      preco: Number(precoPromo),
      imagemUrl,
      ativo: true,
      createdAt: new Date(),
    });

    setTituloPromo("");
    setDescricaoPromo("");
    setPrecoPromo("");
    setImagemPromoArquivo(null);
    buscarPromocoes();
  }

  async function excluirPromocao(id) {
    await deleteDoc(doc(db, "promocoes", id));
    buscarPromocoes();
  }

  async function toggleAtivo(id, statusAtual) {
    await updateDoc(doc(db, "promocoes", id), {
      ativo: !statusAtual,
    });
    buscarPromocoes();
  }

  // ================= GALERIA =================
  async function handleUpload() {
    if (!arquivoMidia) return alert("Selecione um arquivo");

    const { url, tipo } = await uploadMidia(arquivoMidia);

    await addDoc(collection(db, "galeria"), {
      url,
      tipo,
      createdAt: new Date(),
    });

    setArquivoMidia(null);
    buscarGaleria();
  }

  async function excluirMidia(id) {
    await deleteDoc(doc(db, "galeria", id));
    buscarGaleria();
  }
  // ================= Depoimento =================

  async function handleCadastrarDepoimento(e, dados) {
    e.preventDefault();

    try {
      let fotoUrl = "";

      if (dados.fotoBolo) {
        const { url } = await uploadMidia(dados.fotoBolo);
        fotoUrl = url;
      }

      console.log("URL da foto:", fotoUrl);

      await addDoc(collection(db, "depoimentos"), {
        nome: dados.nome,
        comentario: dados.comentario,
        instagram: dados.instagram,
        fotoBolo: fotoUrl,
        estrelas: 5,
        ativo: true,
        createdAt: new Date(),
      });

      alert("Depoimento cadastrado!");

      buscarDepoimentos();
    } catch (erro) {
      console.error("Erro ao cadastrar depoimento:", erro);
    }
  }
  async function excluirDepoimento(id) {
    await deleteDoc(doc(db, "depoimentos", id));
    buscarDepoimentos();
  }
  async function toggleAtivoDepoimento(id, statusAtual) {
    await updateDoc(doc(db, "depoimentos", id), {
      ativo: !statusAtual,
    });

    buscarDepoimentos();
  }

  // ================= UI =================
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Painel Admin</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Sair
        </button>
      </div>

      <div className="flex gap-4 mb-8">
        <button onClick={() => setAbaAtiva("produtos")}>Produtos</button>
        <button onClick={() => setAbaAtiva("promocoes")}>Promoções</button>
        <button onClick={() => setAbaAtiva("galeria")}>Galeria</button>
        <button onClick={() => setAbaAtiva("depoimentos")}>Depoimentos</button>
      </div>

      {abaAtiva === "produtos" && (
        <ProdutosAdmin
          produtos={produtos}
          nome={nome}
          setNome={setNome}
          descricao={descricao}
          setDescricao={setDescricao}
          setImagemArquivo={setImagemArquivo}
          handleCadastrarProduto={handleCadastrarProduto}
          excluirProduto={excluirProduto}
        />
      )}

      {abaAtiva === "promocoes" && (
        <PromocoesAdmin
          promocoes={promocoes}
          tituloPromo={tituloPromo}
          setTituloPromo={setTituloPromo}
          descricaoPromo={descricaoPromo}
          setDescricaoPromo={setDescricaoPromo}
          precoPromo={precoPromo}
          setPrecoPromo={setPrecoPromo}
          setImagemPromoArquivo={setImagemPromoArquivo}
          handleCadastrarPromocao={handleCadastrarPromocao}
          excluirPromocao={excluirPromocao}
          toggleAtivo={toggleAtivo}
        />
      )}

      {abaAtiva === "galeria" && (
        <GaleriaAdmin
          midias={midias}
          setArquivoMidia={setArquivoMidia}
          handleUpload={handleUpload}
          excluirMidia={excluirMidia}
        />
      )}

      {abaAtiva === "depoimentos" && (
        <DepoimentosAdmin
          depoimentos={depoimentos}
          handleCadastrarDepoimento={handleCadastrarDepoimento}
          excluirDepoimento={excluirDepoimento}
          toggleAtivoDepoimento={toggleAtivoDepoimento}
        />
      )}
    </div>
  );
}
