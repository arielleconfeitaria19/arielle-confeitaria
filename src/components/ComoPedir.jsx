export default function ComoPedir() {
  return (
    <section className="py-20 bg-[#FFF6F2] text-center">
      <h3 className="text-3xl font-serif text-[#6B7A5C] mb-10">
        Como fazer seu pedido
      </h3>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

        <div>
          <h4 className="font-semibold text-lg">1️⃣ Escolha seu bolo</h4>
          <p className="text-gray-600 text-sm">
            Veja nossos modelos e promoções disponíveis
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-lg">2️⃣ Fale no WhatsApp</h4>
          <p className="text-gray-600 text-sm">
            Envie o modelo que deseja e tire dúvidas
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-lg">3️⃣ Combine a entrega</h4>
          <p className="text-gray-600 text-sm">
            Agende a data e retirada do seu pedido
          </p>
        </div>

      </div>
    </section>
  );
}