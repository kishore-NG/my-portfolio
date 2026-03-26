import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      
      <h1 className="text-5xl md:text-6xl font-bold mb-6">
        Hi, I'm Kishore 👋
      </h1>

      <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-6">
        I build modern mobile and web applications with clean UI and scalable backend systems.
      </p>

      <div className="flex gap-4">
        <Link
          href="/projects"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          View Projects
        </Link>

        <Link
          href="/contact"
          className="px-6 py-3 border border-black rounded-lg hover:bg-black hover:text-white"
        >
          Contact Me
        </Link>
      </div>

    </main>
  );
}