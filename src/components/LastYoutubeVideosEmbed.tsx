import { Play, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Video {
  id: string;
  title: string;
  embedUrl: string;
}

export function LastYoutubeVideosEmbed() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  useEffect(() => {
    const API_KEY = 'AIzaSyBI_q3LlsfIAsykkuZplZyDUSNT1qTH91k';
    const CHANNEL_ID = 'UC7_cZISX551I8KKPVrour4Q';

    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=3`
    )
      .then((res) => res.json())
      .then((data) => {
        const videoData: Video[] = data.items
          .filter((item: any) => item.id.kind === 'youtube#video')
          .map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            embedUrl: `https://www.youtube.com/embed/${item.id.videoId}?autoplay=1`,
          }));

        setVideos(videoData);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = activeVideo ? 'hidden' : 'auto';
  }, [activeVideo]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading videos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Failed to load videos.</p>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Videos
          </h2>
        </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => setActiveVideo(video)}
            className="group text-left rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
          >
            <div className="relative aspect-video">
              <iframe
                src={video.embedUrl.replace('?autoplay=1', '')}
                title={video.title}
                className="absolute inset-0 w-full h-full pointer-events-none"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
                <Play className="w-14 h-14 text-white opacity-0 group-hover:opacity-100 animate-pulse" />
              </div>
            </div>

            <div className="p-4">
              <p className="font-semibold text-sm line-clamp-2">
                {video.title}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* MODAL */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player */}
            <div className="relative aspect-video">
              <iframe
                src={activeVideo.embedUrl}
                title={activeVideo.title}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
