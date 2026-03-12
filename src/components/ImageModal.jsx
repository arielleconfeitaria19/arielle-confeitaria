export default function ImageModal({ imagem, fechar }) {
  if (!imagem) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={fechar}
    >
      <span
        className="absolute top-5 right-8 text-white text-4xl cursor-pointer"
        onClick={fechar}
      >
        ×
      </span>

      <img
        src={imagem}
        alt="Imagem ampliada"
        className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}