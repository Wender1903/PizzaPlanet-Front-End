"use client";

import { useState, useEffect } from "react";
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

type Pedido = {
    id: number;
    nomeCliente: string;
    itens: PedidoItem[];
    finalizado: boolean;
};

export default function PedidoPage() {
    const [showModal, setShowModal] = useState(false);
    const [editPedido, setEditPedido] = useState<Pedido | null>(null);
    const [nomeCliente, setNomeCliente] = useState("");
    const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
    const [quantidade, setQuantidade] = useState(1);
    const [pedidoItens, setPedidoItens] = useState<PedidoItem[]>([]);
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [filtro, setFiltro] = useState<"todos" | "execucao" | "finalizados">("todos");

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") fecharModal();
        };
        if (showModal) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [showModal]);

    function adicionarAoPedido() {
        if (!selectedPizza) return alert("Adicione uma pizza!");
        if (quantidade < 1) return alert("Selecione uma quantidade válida!");
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

    function aumentarQtd(id: number) {
        setPedidoItens(
            pedidoItens.map((item) =>
                item.pizza.id === id
                    ? { ...item, quantidade: item.quantidade + 1 }
                    : item
            )
        );
    }

    function diminuirQtd(id: number) {
        setPedidoItens(
            pedidoItens.map((item) =>
                item.pizza.id === id
                    ? { ...item, quantidade: item.quantidade > 1 ? item.quantidade - 1 : 1 }
                    : item
            )
        );
    }

    function salvarPedido() {
        if (!nomeCliente.trim()) return alert("Escreva o nome da comanda!");
        if (pedidoItens.length === 0) return alert("Adicione ao menos uma pizza!");
        if (pedidoItens.some(item => item.quantidade < 1)) return alert("Selecione uma quantidade válida para todos os itens!");

        if (editPedido) {
            setPedidos(
                pedidos.map((p) =>
                    p.id === editPedido.id
                        ? { ...p, nomeCliente, itens: pedidoItens }
                        : p
                )
            );
        } else {
            const novoPedido: Pedido = {
                id: pedidos.length + 1,
                nomeCliente,
                itens: pedidoItens,
                finalizado: false,
            };
            setPedidos([...pedidos, novoPedido]);
        }
        fecharModal();
    }

    function fecharModal() {
        setShowModal(false);
        setEditPedido(null);
        setNomeCliente("");
        setPedidoItens([]);
        setSelectedPizza(null);
        setQuantidade(1);
    }

    function editarPedido(pedido: Pedido) {
        setEditPedido(pedido);
        setNomeCliente(pedido.nomeCliente);
        setPedidoItens(pedido.itens);
        setShowModal(true);
    }

    function finalizarPedido(id: number) {
        setPedidos(
            pedidos.map((p) =>
                p.id === id ? { ...p, finalizado: true } : p
            )
        );
    }

    const totalPedido = pedidoItens.reduce(
        (acc, item) => acc + item.pizza.preco * item.quantidade,
        0
    );

    const pedidosFiltrados = pedidos.filter((p) => {
        if (filtro === "execucao") return !p.finalizado;
        if (filtro === "finalizados") return p.finalizado;
        return true;
    });

    const mensagemSemPedidos = () => {
        if (pedidosFiltrados.length === 0) {
            if (filtro === "execucao") return "Sem pedidos em execução hoje";
            if (filtro === "finalizados") return "Sem pedidos finalizados hoje";
            return "Sem pedidos cadastrados";
        }
        return null;
    };

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
            <h1 className="text-4xl font-extrabold text-green-400 mb-6 text-center">
                Pedidos 🚀
            </h1>

            <div className="flex justify-center mb-4">
                <button
                    onClick={() => setShowModal(true)}
                    className="px-6 py-3 bg-green-500 text-black font-bold rounded-md hover:bg-green-400 transition-all"
                >
                    Criar Pedido
                </button>
            </div>

            <div className="flex justify-center mb-6 gap-4">
                <button
                    onClick={() => setFiltro("todos")}
                    className={`px-4 py-2 rounded-md font-bold ${filtro === "todos" ? "bg-green-500 text-black" : "bg-gray-700 text-white"}`}
                >
                    Todos
                </button>
                <button
                    onClick={() => setFiltro("execucao")}
                    className={`px-4 py-2 rounded-md font-bold ${filtro === "execucao" ? "bg-green-500 text-black" : "bg-gray-700 text-white"}`}
                >
                    Em execução
                </button>
                <button
                    onClick={() => setFiltro("finalizados")}
                    className={`px-4 py-2 rounded-md font-bold ${filtro === "finalizados" ? "bg-green-500 text-black" : "bg-gray-700 text-white"}`}
                >
                    Finalizados
                </button>
            </div>

            {pedidosFiltrados.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-8">
                    {pedidosFiltrados.map((p) => {
                        const total = p.itens.reduce(
                            (acc, item) => acc + item.pizza.preco * item.quantidade,
                            0
                        );
                        return (
                            <div
                                key={p.id}
                                className="w-[360px] h-[420px] bg-black/80 p-5 rounded-lg border border-green-500/30 shadow-md relative flex flex-col justify-evenly">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-semibold text-green-300 text-lg">{p.nomeCliente}</h3>
                                    <button onClick={() => editarPedido(p)} className="px-2 py-1 bg-green-500 text-black rounded text-sm hover:bg-green-400 transition-all" >
                                        ✏️
                                    </button>
                                </div>

                                <p className="text-sm text-white/70 mb-3">ID: {p.id}</p>

                                <ul className="mb-3 text-sm">
                                    {p.itens.map((item, index) => (
                                        <li
                                            key={item.pizza.id}
                                            className="flex justify-between text-white/80 mb-1"
                                        >
                                            {index + 1}. {item.pizza.nome} x {item.quantidade}
                                            <span>R$ {(item.pizza.preco * item.quantidade).toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="text-right font-bold text-green-400 text-base mb-3">
                                    Total: R$ {total.toFixed(2)}
                                </div>

                                {!p.finalizado ? (
                                    <button
                                        onClick={() => finalizarPedido(p.id)}
                                        className="w-full py-2 bg-green-500 text-black font-bold rounded-md text-sm hover:bg-green-400 transition-all"
                                    >
                                        Finalizar
                                    </button>
                                ) : (
                                    <span className="text-sm text-gray-400 font-semibold">
                                        Finalizado ✅
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-center text-gray-400 font-semibold mt-8">
                    {mensagemSemPedidos()}
                </p>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-black/90 rounded-xl shadow-lg border border-green-500/30 flex">
                        <div className="w-[494px] h-[489px] bg-green-500 flex items-center justify-center">
                            <img
                                src="https://i.pinimg.com/564x/99/25/2c/99252cb5b21cb53519e76360498a4ad8.jpg"
                                alt="Pizza Decorativa"
                                className="w-full h-full object-cover rounded-l-xl"
                            />
                        </div>

                        <div className="w-[494px] h-[489px] p-6 flex flex-col justify-between">
                            <h2 className="text-2xl font-bold text-green-300 mb-4 text-center">
                                {editPedido ? "Editar Pedido" : "Novo Pedido"}
                            </h2>

                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-white mb-1">
                                    Nome do Cliente
                                </label>
                                <input
                                    type="text"
                                    value={nomeCliente}
                                    onChange={(e) => setNomeCliente(e.target.value)}
                                    className="w-full p-2 rounded-md bg-gray-800 text-white border border-green-500/20 focus:border-green-400"
                                />
                            </div>

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

                            <div className="mb-4 flex items-center gap-2">
                                <label className="block text-sm font-semibold text-white">
                                    Quantidade
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(Math.max(1, Number(e.target.value)))}
                                    className="w-20 p-2 rounded-md bg-gray-800 text-white border border-green-500/20 focus:border-green-400 appearance-none"
                                />
                            </div>

                            <div className="flex justify-between mb-4">
                                <button
                                    onClick={fecharModal}
                                    className="px-4 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-500 transition-all"
                                >
                                    Cancelar
                                </button>

                                <button
                                    onClick={adicionarAoPedido}
                                    className="px-4 py-2 bg-green-500 text-black font-bold rounded-md hover:bg-green-400 transition-all"
                                >
                                    Adicionar Pizza
                                </button>
                            </div>

                            {pedidoItens.length > 0 && (
                                <div className="max-h-40 overflow-y-auto mb-4">
                                    {pedidoItens.map((item, index) => (
                                        <div
                                            key={item.pizza.id}
                                            className="flex justify-between items-center mb-2 p-1 border-b border-green-500/20"
                                        >
                                            <p className="text-sm text-green-300">
                                                {index + 1}. {item.pizza.nome} x {item.quantidade}
                                            </p>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => aumentarQtd(item.pizza.id)}
                                                    className="px-2 py-0.5 bg-green-500 text-black rounded text-xs hover:bg-green-400 transition-all"
                                                >
                                                    ➕
                                                </button>
                                                <button
                                                    onClick={() => diminuirQtd(item.pizza.id)}
                                                    className="px-2 py-0.5 bg-yellow-500 text-black rounded text-xs hover:bg-yellow-400 transition-all"
                                                >
                                                    ➖
                                                </button>
                                                <button
                                                    onClick={() => removerItem(item.pizza.id)}
                                                    className="px-2 py-0.5 bg-red-600 text-white rounded text-xs hover:bg-red-500 transition-all"
                                                >
                                                    ❌
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="text-right font-bold text-green-400 text-base mb-2">
                                Total: R$ {totalPedido.toFixed(2)}
                            </div>

                            <button
                                onClick={salvarPedido}
                                className="w-full py-2 bg-green-500 text-black font-bold rounded-md hover:bg-green-400 transition-all"
                            >
                                {editPedido ? "Atualizar Pedido" : "Salvar Pedido"} 🚀
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
