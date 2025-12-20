import { Youtube, Linkedin, Instagram, Github, Twitter } from 'lucide-react';
import { socialLinks } from '../data';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  youtube: Youtube,
  linkedin: Linkedin,
  instagram: Instagram,
  github: Github,
  twitter: Twitter,
};

export function SocialLinks() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Connect With Me
        </h2>
        <p className="text-gray-600 mb-10 text-lg">
          Stay updated with daily content and opportunities
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-110"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white group-hover:from-blue-600 group-hover:to-blue-700 transition-all">
                  <Icon className="w-8 h-8" />
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                  {link.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
