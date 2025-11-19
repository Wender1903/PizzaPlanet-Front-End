"use client";

import Link from "next/link";

export default function PedidoPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
            <h1 className="text-4xl font-bold text-green-400 mb-6">
                Tela de Pedidos 🍕
            </h1>

            <p className="mb-6 text-center text-gray-300">
                Aqui você poderá criar e gerenciar pedidos. Por enquanto, só estamos testando a conexão.
            </p>

            <Link
                href="/cardapio"
                className="px-6 py-3 rounded-lg bg-green-500 text-gray-900 font-bold hover:bg-green-400 transition-all"
            >
                Voltar para Cardápio
            </Link>
        </div>
    );
}
