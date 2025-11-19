"use client";

import { cardapio as cardapioInicial } from "@/data/cardapio";
import { useState } from "react";

export default function CardapioPage() {
  const [cardapio, setCardapio] = useState(cardapioInicial);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [img, setImg] = useState("");

  const [editId, setEditId] = useState<number | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!nome.trim()) {
      alert("Preencha o nome da pizza!");
      return;
    }

    if (!descricao.trim()) {
      alert("Preencha a descrição!");
      return;
    }

    if (!preco || Number(preco) <= 0) {
      alert("Digite um preço válido!");
      return;
    }

    if (!img.trim()) {
      alert("Coloque a URL da imagem!");
      return;
    }

    if (editId !== null) {
      setCardapio((prev) =>
        prev.map((item) =>
          item.id === editId
            ? { ...item, nome, descricao, preco: Number(preco), img }
            : item
        )
      );
      setEditId(null);
    } else {
      const novoItem = {
        id: cardapio.length + 1,
        nome,
        descricao,
        preco: Number(preco),
        img,
      };
      setCardapio([...cardapio, novoItem]);
    }

    setNome("");
    setDescricao("");
    setPreco("");
    setImg("");
  }

  function handleEdit(item: typeof cardapioInicial[0]) {
    setEditId(item.id);
    setNome(item.nome);
    setDescricao(item.descricao);
    setPreco(item.preco.toString());
    setImg(item.img);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancel() {
    setEditId(null);
    setNome("");
    setDescricao("");
    setPreco("");
    setImg("");
  }

  function handleDelete(id: number) {
    if (confirm("Deseja realmente deletar este item?")) {
      setCardapio(cardapio.filter((item) => item.id !== id));
    }
  }

  return (
    <div className="p-8">
      <div className="bg-gray-900 p-8 rounded-xl shadow-[0_0_20px_rgba(0,255,0,0.4)] border border-green-500/30 max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-green-400 text-center mb-6 tracking-wider">
          {editId !== null ? "Atualizar Cardápio 🚀" : "Cadastrar Novo Item 🚀"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Nome da Pizza"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white border border-green-500/20 focus:border-green-400"
          />

          <textarea
            placeholder="Descrição da Pizza"
            rows={3}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white border border-green-500/20 focus:border-green-400"
          />

          <input
            type="number"
            step="0.01"
            placeholder="Preço (R$)"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white border border-green-500/20 focus:border-green-400"
          />

          <input
            type="text"
            placeholder="URL da Imagem da Pizza"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white border border-green-500/20 focus:border-green-400"
          />

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="flex-1 p-3 rounded-lg font-bold bg-green-500 text-gray-900 hover:bg-green-400 transition-all"
            >
              {editId !== null ? "Atualizar 🍕" : "Cadastrar 🍕"}
            </button>

            {editId !== null && (
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 p-3 rounded-lg font-bold bg-gray-700 text-white hover:bg-gray-600 transition-all"
              >
                Cancelar ❌
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="flex flex-wrap gap-6 p-6 justify-center">
        {cardapio.map((item, index) => (
          <div
            key={item.id}
            className="relative float-card flex flex-col w-64 p-4 rounded-xl bg-black text-center shadow-[0_0_15px_rgba(0,255,0,0.3)] border border-green-500/20 transition-all duration-300 hover:scale-105"
            style={{ animationDelay: `${index * 0.4}s` }}
          >
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="p-1 bg-gray-900 border border-green-500 text-green-400 rounded hover:bg-green-500 hover:text-black transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 4h2m4 0h2m-2 2v2m-2 4h2m-2 2h2M6 20h12M4 16h16M4 12h16M4 8h16M4 4h16"
                  />
                </svg>
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="p-1 bg-gray-900 border border-green-500 text-green-400 rounded hover:bg-green-500 hover:text-black transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <img
              src={item.img}
              alt={item.nome}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />

            <h3 className="text-xl font-semibold mb-1 text-white">{item.nome}</h3>

            <p className="text-sm text-white/80">{item.descricao}</p>

            <strong className="mt-3 text-lg text-green-400">
              R$ {item.preco.toFixed(2)}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}
