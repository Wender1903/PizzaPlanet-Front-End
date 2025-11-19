"use client";

import { useState } from "react";
import { cardapio as cardapioInicial } from "@/data/cardapio";

type Pizza = {
  id: number;
  nome: string;
  preco: number;
};

type PedidoItem = {
  pizza: Pizza;
  quantidade: number;
};

export default function PedidoPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const [quantidade, setQuantidade] = useState(1);
  const [pedidoItens, setPedidoItens] = useState<PedidoItem[]>([]);

  function adicionarAoPedido() {
    if (!selectedPizza) return;

    const existe = pedidoItens.find((p) => p.pizza.id === selectedPizza.id);
    if (existe) {
      setPedidoItens(
        pedidoItens.map((p) =>
          p.pizza.id === selectedPizza.id
            ? { ...p, quantidade: p.quantidade + quantidade }
            : p
        )
      );
    } else {
      setPedidoItens([...pedidoItens, { pizza: selectedPizza, quantidade }]);
    }

    setSelectedPizza(null);
    setQuantidade(1);
  }

  function removerItem(id: number) {
    setPedidoItens(pedidoItens.filter((item) => item.pizza.id !== id));
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6 text-white">
      <h1 className="text-4xl font-extrabold text-green-400 mb-6">Pedidos 🚀</h1>

      <button
        onClick={() => setShowModal(true)}
        className="px-6 py-3 bg-green-500 text-black font-bold rounded-md hover:bg-green-400 transition-all"
      >
        Criar Pedido
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-black/90 p-6 rounded-xl w-96 shadow-lg border border-green-500/30">
            <h2 className="text-2xl font-bold text-green-300 mb-4 text-center">
              Novo Pedido
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-white mb-1">
                Selecionar Pizza
              </label>
              <select
                value={selectedPizza?.id || ""}
                onChange={(e) => {
                  const pizza = cardapioInicial.find(
                    (p) => p.id === Number(e.target.value)
                  );
                  setSelectedPizza(pizza || null);
                }}
                className="w-full p-2 rounded-md bg-gray-800 text-white border border-green-500/20 focus:border-green-400"
              >
                <option value="">-- Selecione --</option>
                {cardapioInicial.map((pizza) => (
                  <option key={pizza.id} value={pizza.id}>
                    {pizza.nome} - R$ {pizza.preco.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-white mb-1">
                Quantidade
              </label>
              <input
                type="number"
                min={1}
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
                className="w-full p-2 rounded-md bg-gray-800 text-white border border-green-500/20 focus:border-green-400"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-500 transition-all"
              >
                Cancelar
              </button>

              <button
                onClick={adicionarAoPedido}
                className="px-4 py-2 bg-green-500 text-black font-bold rounded-md hover:bg-green-400 transition-all"
              >
                Adicionar
              </button>
            </div>

            {pedidoItens.length > 0 && (
              <div className="mt-4 max-h-40 overflow-y-auto">
                {pedidoItens.map((item) => (
                  <div
                    key={item.pizza.id}
                    className="flex justify-between items-center mb-2 p-1 border-b border-green-500/20"
                  >
                    <p className="text-sm text-green-300">
                      {item.pizza.nome} x {item.quantidade}
                    </p>
                    <button
                      onClick={() => removerItem(item.pizza.id)}
                      className="px-2 py-0.5 bg-red-600 text-white rounded text-xs hover:bg-red-500 transition-all"
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
