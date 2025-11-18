import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-4 px-12 bg-gray-950 text-white flex items-center justify-between shadow-lg shadow-green-500/20">
      <h1 className="font-bold text-2xl tracking-wide text-green-400">Pizza Planet</h1>

      <nav className="flex gap-6">
        <Link className="hover:text-green-400 transition" href="/">Home</Link>
        <Link className="hover:text-green-400 transition" href="/cardapio">Cardápio</Link>
        <Link className="hover:text-green-400 transition" href="/pedido">Pedido</Link>
      </nav>
    </header>
  );
}
