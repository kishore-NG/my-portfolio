import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-5 bg-black text-white">
      <h1 className="text-xl font-bold">Kishore</h1>

      <div className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/about" className="hover:text-gray-400">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}