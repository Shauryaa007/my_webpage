import { Briefcase, Linkedin, Youtube } from 'lucide-react';
export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-slate-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-6">
        <div className="w-32 border ring-1 ring-slate-900 h-32 mx-auto mb-6 rounded-full shadow-lg bg-cover bg-center"
          style={{ backgroundImage: "url('/profile.png')" }}>
        </div>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-4">
          Shaurya Awasthiiiiiiii
        </h1>

        <p className="text-xl sm:text-2xl text-gray-600 mb-6 font-medium">
          Software Engineer | DSA Trainer | YouTuber
        </p>

        <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
          Helping students build strong technical foundations, prepare for interviews, and stay updated with real job & internship opportunities through practical content and trainings.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://www.youtube.com/@Shauryaaa007?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Youtube className="w-6 h-6" />
            Subscribe on YouTube
          </a>

          <a
            href="https://www.linkedin.com/in/shaurya007/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Linkedin className="w-6 h-6" />
            Follow on LinkedIn
          </a>

          <button
            onClick={() => scrollToSection('jobs')}
            className="group inline-flex items-center gap-2 bg-slate-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-900 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Briefcase className="w-6 h-6" />
            View Latest Jobs
          </button>
        </div>
      </div>
    </section>
  );
}
