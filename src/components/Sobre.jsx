import cliente from "../assets/cliente.jpg";

export default function Sobre() {
  return (
    <section 
      id="sobre"
      className="py-16 px-4 sm:px-8 md:px-16 bg-[#FDF9F7]"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* Imagem */}
        <div className="flex justify-center">
          <img
            src={cliente}
            alt="Confeiteira"
            className="w-72 sm:w-96 rounded-3xl shadow-xl object-cover"
          />
        </div>

        {/* Texto */}
        <div>
          <h3 className="text-3xl md:text-4xl font-serif text-[#6B7A5C] mb-6">
            Sobre a Confeiteira
          </h3>

          <p className="text-gray-700 leading-relaxed text-lg">
            Com anos de experiência na confeitaria artesanal, Arielle transforma
            ingredientes selecionados em lembranças inesquecíveis. 
            Especializada em bolos personalizados e doces finos,
            seu trabalho combina sabor, elegância e dedicação em cada detalhe.
          </p>
        </div>

      </div>
    </section>
  );
}