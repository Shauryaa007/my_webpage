export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          About Me
        </h2>

        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 sm:p-12 shadow-md">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Hey there! I'm a <span className="font-semibold text-blue-600">Software Engineer at Accenture</span> with a passion for helping undergraduates succeed in their tech careers.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Through my <span className="font-semibold text-red-600">YouTube channel with 6K+ subscribers</span>, I share Data Structures & Algorithms tutorials, Computer Science Fundamentals, interview experiences, and daily job & internship opportunities to help you land your dream role.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you're preparing for placements, learning DSA, CS-Fundamentals or looking for the latest tech opportunities, I'm here to guide you every step of the way. Let's grow together!
          </p>
        </div>
      </div>
    </section>
  );
}
