import { cardapio } from "@/data/cardapio";

export default function CardapioPage() {
  return (
    <div className="flex flex-wrap gap-6 p-6 justify-center">
      {cardapio.map((item, index) => (
        <div
          key={item.id}
          className={`
            float-card
            flex flex-col 
            w-64 p-4 rounded-xl 
            bg-black text-center 
            shadow-[0_0_15px_rgba(0,255,0,0.3)]
            border border-green-500/20
            transition-all duration-300
            hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,0,0.6)]
          `}
          style={{
            animationDelay: `${index * 0.4}s`, // 🟢 delays diferentes!
          }}
        >
          <img
            src={item.img}
            alt={item.nome}
            className="
              w-full h-40 
              object-cover 
              rounded-lg mb-3
            "
          />

          <h3 className="text-xl font-semibold mb-1 text-white">
            {item.nome}
          </h3>

          <p className="text-sm text-white/80">
            {item.descricao}
          </p>

          <strong className="mt-3 text-lg text-green-400">
            R$ {item.preco.toFixed(2)}
          </strong>
        </div>
      ))}
    </div>
  );
}
