const projects = [
  {
    title: "Volunteer Management App",
    description:
      "A Flutter-based app to manage volunteers, events, and team challenges.",
    tech: ["Flutter", "Node.js", "MongoDB"],
    link: "#",
  },
  {
    title: "Chat Application",
    description:
      "Real-time chat app using Socket.io with scalable backend architecture.",
    tech: ["Flutter", "Node.js", "Socket.io"],
    link: "#",
  },
];

export default function Projects() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">
              {project.title}
            </h2>

            <p className="text-gray-600 mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-200 rounded text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

         <a
  href={project.link}
  className="inline-block mt-2 text-sm font-medium text-white bg-black px-4 py-2 rounded hover:bg-gray-800"
>
  View Project
</a>
          </div>
        ))}
      </div>
    </div>
  );
}