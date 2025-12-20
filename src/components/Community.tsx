import { MessageCircle, Users } from 'lucide-react';

export function Community() {
  return (
    <section id="community" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Users className="w-10 h-10" />
        </div>

        <h2 className="text-4xl font-bold mb-4">
          Join Our Community
        </h2>

        <p className="text-xl mb-10 text-blue-100 leading-relaxed max-w-2xl mx-auto">
          Connect with thousands of students preparing for placements. Get daily job alerts, interview tips, and DSA resources directly in your feed.
        </p>

        <a
          href="https://www.whatsapp.com/channel/0029Vafuyjx0bIdvR31hJc13"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          <MessageCircle className="w-6 h-6" />
          Join WhatsApp Channel
        </a>
      </div>
    </section>
  );
}
