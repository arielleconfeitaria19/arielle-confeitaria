export default function DepoimentosAdmin({
  depoimentos,
  handleCadastrarDepoimento,
  excluirDepoimento,
  toggleAtivoDepoimento,
}) {
  return (
    <div className="admin-container">
      <h2>Gerenciar Depoimentos</h2>

      {/* FORMULÁRIO */}
      <form
        className="form-depoimento"
        onSubmit={(e) =>
          handleCadastrarDepoimento(e, {
            nome: e.target.nome.value,
            comentario: e.target.comentario.value,
            fotoBolo: e.target.foto.files[0],
            instagram: e.target.instagram.value,
          })
        }
      >
        <input name="nome" placeholder="Nome do cliente" required />

        <textarea name="comentario" placeholder="Depoimento" required />

        <input name="instagram" placeholder="Instagram (opcional)" />

        <input name="foto" type="file" />

        <button type="submit">Adicionar Depoimento</button>
      </form>

      {/* LISTA DE DEPOIMENTOS */}

      <div className="lista-depoimentos">
        {depoimentos.map((dep) => (
          <div key={dep.id} className="card-depoimento">

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

            <img src={dep.fotoBolo} alt={dep.nome} />

            <h4>{dep.nome}</h4>

            <p>{dep.comentario}</p>

            <div className="botoes">
              <button onClick={() => toggleAtivoDepoimento(dep.id, dep.ativo)}>
                {dep.ativo ? "Desativar" : "Ativar"}
              </button>

              <button
                className="btn-excluir"
                onClick={() => excluirDepoimento(dep.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
