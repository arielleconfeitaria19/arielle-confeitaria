export default function GaleriaAdmin({
  midias,
  setArquivoMidia,
  handleUpload,
  excluirMidia,
}) {
  return (
    <div>

      {/* FORMULÁRIO */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-bold mb-4">
          Adicionar Foto ou Vídeo
        </h2>

        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setArquivoMidia(e.target.files[0])}
          className="mb-4"
        />

        <button
          onClick={handleUpload}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Enviar Mídia
        </button>
      </div>

      {/* LISTA DA GALERIA */}
      <div className="grid md:grid-cols-3 gap-6">
        {midias.map((m) => (
          <div
            key={m.id}
            className="bg-white p-4 rounded-xl shadow"
          >
            {m.tipo === "image" ? (
              <img
                src={m.url}
                className="h-40 w-full object-cover rounded"
              />
            ) : (
              <video
                src={m.url}
                controls
                className="h-40 w-full object-cover rounded"
              />
            )}

            <button
              onClick={() => excluirMidia(m.id)}
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