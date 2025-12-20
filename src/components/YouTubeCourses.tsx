import { PlayCircle, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoCount: number;
  embedUrl: string;
}

export function YouTubeCourses() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [filtered, setFiltered] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    const API_KEY = 'AIzaSyBI_q3LlsfIAsykkuZplZyDUSNT1qTH91k';
    const CHANNEL_ID = 'UC7_cZISX551I8KKPVrour4Q';

    fetch(
      `https://www.googleapis.com/youtube/v3/playlists?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,contentDetails&maxResults=12`
    )
      .then((res) => res.json())
      .then((data) => {
        const formatted: Playlist[] = data.items.map((item: any) => ({
          id: item.id,
          title: item.snippet.title,
          description:
            item.snippet.description || 'Playlist from my YouTube channel',
          thumbnail:
            item.snippet.thumbnails?.medium?.url ||
            item.snippet.thumbnails?.default?.url,
          videoCount: item.contentDetails.itemCount,
          embedUrl: `https://www.youtube.com/embed/videoseries?list=${item.id}`,
        }));

        setPlaylists(formatted);
        setFiltered(formatted);
        setLoading(false);
      });
  }, []);

  /* 🔍 Search filter */
  useEffect(() => {
    const query = search.toLowerCase();

    setFiltered(
      playlists.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      )
    );
  }, [search, playlists]);

  /* 🔒 Lock background scroll */
  useEffect(() => {
    document.body.style.overflow = activePlaylist ? 'hidden' : 'auto';
  }, [activePlaylist]);

  return (
    <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            YouTube Playlists & Courses
          </h2>
          <p className="text-lg text-gray-600">
            Free content to help you master coding and ace interviews
          </p>
        </div>

        {/* 🔍 SEARCH */}
        <div className="max-w-xl mx-auto mb-10 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search playlists..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        {loading && (
          <p className="text-center text-gray-500">Loading playlists...</p>
        )}

        {/* PLAYLIST GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => setActivePlaylist(playlist)}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:scale-[1.02] border-2 border-transparent hover:border-red-300 text-left"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video">
                <img
                  src={playlist.thumbnail}
                  alt={playlist.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <PlayCircle className="w-14 h-14 text-white" />
                </div>

                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-3 py-1 rounded-full">
                  {playlist.videoCount} videos
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {playlist.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {playlist.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 🎨 MODAL WITH ANIMATION */}
      {activePlaylist && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4 animate-fadeIn"
          onClick={() => setActivePlaylist(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePlaylist(null)}
              className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video">
              <iframe
                src={`${activePlaylist.embedUrl}&autoplay=1`}
                title={activePlaylist.title}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
