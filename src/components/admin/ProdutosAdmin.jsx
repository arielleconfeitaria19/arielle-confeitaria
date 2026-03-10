export default function ProdutosAdmin({
  produtos,
  nome,
  setNome,
  descricao,
  setDescricao,
  setImagemArquivo,
  handleCadastrarProduto,
  excluirProduto,
}) {
  return (
    <div>

      {/* FORMULÁRIO */}
      <form
        onSubmit={handleCadastrarProduto}
        className="bg-white p-6 rounded-xl shadow mb-10"
      >
        <h2 className="text-xl font-bold mb-4">Cadastrar Produto</h2>

        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagemArquivo(e.target.files[0])}
          className="mb-3"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Cadastrar Produto
        </button>
      </form>

      {/* LISTA DE PRODUTOS */}
      <div className="grid md:grid-cols-3 gap-6">
        {produtos.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow">
            <img
              src={p.imagemUrl}
              className="h-40 w-full object-cover rounded"
            />

            <h3 className="font-bold mt-2">{p.nome}</h3>

            <p className="text-gray-600">{p.descricao}</p>

            <button
              onClick={() => excluirProduto(p.id)}
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}