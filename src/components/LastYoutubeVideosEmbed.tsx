import { useEffect, useState } from 'react';

interface Video {
  id: string;
  title: string;
  youtubeLink: string;
  embedUrl: string;
}

export function LastYoutubeVideosEmbed() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const getEmbedUrl = (link: string) => {
    const videoId = link.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  useEffect(() => {
    fetch(
      'https://opensheet.elk.sh/1XQpGNK8aJOPE5X-gfz1Lbx9rvfVqgNjT8IGiH24tVZE/Latestvid'
    )
      .then((res) => res.json())
      .then((data) => {
        const validVideos = data
          .filter((v: any) => v.youtubeLink && v.title)
          .map((v: any) => ({
            id: v.id,
            title: v.title,
            youtubeLink: v.youtubeLink,
            embedUrl: getEmbedUrl(v.youtubeLink),
          }));

        setVideos(validVideos);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading videos...</p>;
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Latest Videos
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <div className="aspect-video">
              <iframe
                src={video.embedUrl}
                title={video.title}
                className="w-full h-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-white">
              <p className="font-semibold text-sm line-clamp-2">
                {video.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
