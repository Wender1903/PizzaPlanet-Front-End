export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 p-10">

      <div className="max-w-6xl mx-auto bg-gray-900 shadow-2xl shadow-green-500/40 rounded-lg p-12 flex">

        <div className="w-1/2 pr-10">
          <h2 className="text-4xl font-extrabold tracking-wider text-white">
            Bem-vindo ao
            <b className="ml-2 text-green-400 animate-pulse">Pizza Planet!</b>
          </h2>

          <p className="text-xl font-semibold text-green-400 mb-6 tracking-wide">
            Sistema Interno de Pedidos e Gestão
          </p>

          <p className="text-gray-300 leading-relaxed mb-8 tracking-wide">
            Aqui você tem acesso rápido a todas as ferramentas necessárias para garantir que a melhor pizza
            da galáxia chegue ao nosso cliente.
          </p>

          <ul className="mt-4 space-y-3 text-gray-300 leading-loose">
            <li className="flex items-center tracking-wide">
              <span className="text-green-400 mr-2 text-lg">📋</span>
              <b className="text-white">Cardápio:</b>&nbsp;Gerenciamento de itens e preços.
            </li>

            <li className="flex items-center tracking-wide">
              <span className="text-green-400 mr-2 text-lg">🍕</span>
              <b className="text-white">Pedido:</b>&nbsp;Processamento e acompanhamento de entregas.
            </li>
          </ul>
        </div>

        <div className="w-1/2 flex items-center justify-center rounded-md overflow-hidden p-4">
          <div className="shadow-xl shadow-green-500/40 rounded-md">
            <img
              src="/pizzaplanetfinal.png"
              alt="Uma pizza deliciosa com legumes frescos"
              className="object-contain w-full h-full rounded-md"
            />
          </div>
        </div>

      </div>

    </div>
  );
}
