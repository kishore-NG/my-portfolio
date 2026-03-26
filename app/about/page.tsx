export default function About() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      
      <h1 className="text-4xl font-bold mb-6">About Me</h1>

      <p className="text-gray-700 mb-4">
        I'm Kishore, a passionate developer focused on building high-quality mobile and web applications.
      </p>

      <p className="text-gray-700 mb-4">
        I specialize in Flutter, Node.js, and modern web technologies. I enjoy creating scalable systems and clean user interfaces.
      </p>

      {/* <p className="text-gray-700">
        Currently, I'm focused on building SaaS products and improving my full-stack development skills.
      </p> */}

      <div className="mt-8">
  <h2 className="text-2xl font-semibold mb-4">Skills</h2>

  <div className="flex flex-wrap gap-3">
    <span className="px-3 py-1 bg-gray-200 rounded">Flutter</span>
    <span className="px-3 py-1 bg-gray-200 rounded">Node.js</span>
    <span className="px-3 py-1 bg-gray-200 rounded">Next.js</span>
    <span className="px-3 py-1 bg-gray-200 rounded">MongoDB</span>
  </div>
</div>

    </div>



  );
}

