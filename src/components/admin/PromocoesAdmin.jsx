export default function PromocoesAdmin({
  promocoes,
  tituloPromo,
  setTituloPromo,
  descricaoPromo,
  setDescricaoPromo,
  precoPromo,
  setPrecoPromo,
  setImagemPromoArquivo,
  handleCadastrarPromocao,
  excluirPromocao,
  toggleAtivo,
}) {
  return (
    <div>

      {/* FORMULÁRIO */}
      <form
        onSubmit={handleCadastrarPromocao}
        className="bg-white p-6 rounded-xl shadow mb-10"
      >
        <h2 className="text-xl font-bold mb-4">Cadastrar Promoção</h2>

        <input
          type="text"
          placeholder="Título da promoção"
          value={tituloPromo}
          onChange={(e) => setTituloPromo(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <textarea
          placeholder="Descrição"
          value={descricaoPromo}
          onChange={(e) => setDescricaoPromo(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="number"
          placeholder="Preço"
          value={precoPromo}
          onChange={(e) => setPrecoPromo(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagemPromoArquivo(e.target.files[0])}
          className="mb-3"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Cadastrar Promoção
        </button>
      </form>

      {/* LISTA */}
      <div className="grid md:grid-cols-3 gap-6">
        {promocoes.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow">
            <img
              src={p.imagemUrl}
              className="h-40 w-full object-cover rounded"
            />

            <h3 className="font-bold mt-2">{p.titulo}</h3>

            <p>{p.descricao}</p>

            <p className="font-semibold">
              R$ {p.preco?.toFixed(2)}
            </p>

            <button
              onClick={() => toggleAtivo(p.id, p.ativo)}
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
            >
              {p.ativo ? "Desativar" : "Ativar"}
            </button>

            <button
              onClick={() => excluirPromocao(p.id)}
              className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}