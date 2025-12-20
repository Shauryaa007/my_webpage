import { Youtube, Linkedin, Instagram, Github, Twitter, Heart } from 'lucide-react';
import { socialLinks } from '../data';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  youtube: Youtube,
  linkedin: Linkedin,
  instagram: Instagram,
  github: Github,
  twitter: Twitter,
};

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Shaurya Awasthi</h3>
          <p className="text-slate-400 mb-6 flex items-center gap-2">
            Built to help students grow in tech
            <Heart className="w-4 h-4 text-red-500 fill-current" />
          </p>

          <div className="flex gap-4 mb-6">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-all hover:scale-110"
                  aria-label={link.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Shaurya Awasthi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
