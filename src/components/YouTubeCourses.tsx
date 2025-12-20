// import { PlayCircle, X } from 'lucide-react';
// import { useEffect, useState } from 'react';

// interface Playlist {
//   id: string;
//   title: string;
//   firstvid: string;
//   url: string;
//   embedUrl: string;
// }

// export function YouTubeCourses() {
//   const [playlistData, setPlaylistData] = useState<Playlist[]>([]);
//   const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null);
//   const [loading, setLoading] = useState(true);

//   // const getEmbedUrl = (link: string) => {
//   //   const videoId = link.split('v=')[1]?.split('&')[0];
//   //   return `https://www.youtube.com/embed/${videoId}`;
//   // };

//   useEffect(() => {
//     // Replace with your Google Sheet JSON URL
//     const SHEET_URL =
//       'https://opensheet.elk.sh/1XQpGNK8aJOPE5X-gfz1Lbx9rvfVqgNjT8IGiH24tVZE/courses';

//     fetch(SHEET_URL)
//       .then((res) => res.json())
//       .then((data) => {
//         // Defensive filtering to avoid broken rows
//         const formatted: Playlist[] = data
//           .filter((item: any) => item.url) // ensure URL exists
//           .map((item: any) => {
//             const url = item.url;
//             const params = new URLSearchParams(new URL(url).search);
//             const id = params.get('list') || '';
//             const thumbnail = item.firstvid;
//             return {
//               id,
//               title: item.title || `Playlist ${id}`,
//               thumbnail,
//               url,
//             };
//           });

//         setPlaylistData(formatted);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Failed to load playlists', err);
//         setLoading(false);
//       });
//   }, []);

//   // Lock background scroll when modal is open
//   useEffect(() => {
//     document.body.style.overflow = activePlaylist ? 'hidden' : 'auto';
//   }, [activePlaylist]);

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading playlists...</p>;
//   }

//   if (!playlistData.length) {
//     return <p className="text-center text-gray-500">No playlists available.</p>;
//   }

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 py-6">
//       <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             YouTube Playlists & Courses
//           </h2>
//           <p className="text-lg text-gray-600">
//             Free content to help you master coding and ace interviews
//           </p>
//         </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {playlistData.map((playlist) => (
//           <button
//             key={playlist.id}
//             onClick={() => setActivePlaylist(playlist)}
//             className="group text-left rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
//           >
//             <div className="relative aspect-video">
//               <img
//                 src={playlist.thumbnail}
//                 alt={playlist.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//                 <PlayCircle className="w-14 h-14 text-white" />
//               </div>
//             </div>
//             <div className="p-4">
//               <p className="font-semibold text-sm line-clamp-2">
//                 {playlist.title}
//               </p>
//             </div>
//           </button>
//         ))}
//       </div>

//       {/* MODAL */}
//       {activePlaylist && (
//         <div
//           className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
//           onClick={() => setActivePlaylist(null)}
//         >
//           <div
//             className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setActivePlaylist(null)}
//               className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full"
//             >
//               <X className="w-5 h-5" />
//             </button>

//             <div className="relative aspect-video">
//               <iframe
//                 src={`https://www.youtube.com/embed/videoseries?list=${activePlaylist.id}&autoplay=1`}
//                 title={activePlaylist.title}
//                 className="absolute inset-0 w-full h-full"
//                 allow="autoplay; encrypted-media; picture-in-picture"
//                 allowFullScreen
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import { PlayCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Playlist {
  id: string;
  title: string;
  firstvid: string;
  url: string;
  videoCount?: number;
}

export function YouTubeCourses() {
  const [playlistData, setPlaylistData] = useState<Playlist[]>([]);
  const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const SHEET_URL =
      'https://opensheet.elk.sh/1XQpGNK8aJOPE5X-gfz1Lbx9rvfVqgNjT8IGiH24tVZE/courses';

    fetch(SHEET_URL)
      .then((res) => res.json())
      .then(async (data) => {
        const formatted: Playlist[] = data
          .filter((item: any) => item.url)
          .map((item: any) => {
            const url = item.url;
            const params = new URLSearchParams(new URL(url).search);
            const id = params.get('list') || '';
            return {
              id,
              title: item.title || `Playlist ${id}`,
              firstvid: item.firstvid,
              url,
            };
          });

        // Fetch video count from playlist page HTML
        const playlistsWithCount = await Promise.all(
          formatted.map(async (pl) => {
            try {
              const res = await fetch(pl.url);
              const text = await res.text();

              // Extract JSON containing playlist info
              const match = text.match(/"playlistVideoListRenderer":({.*?})}/s);
              let count = 0;
              if (match) {
                const jsonStr = match[1];
                const json = JSON.parse(jsonStr);
                count = json?.contents?.length || 0;
              }

              // Fallback: sometimes meta tag contains "X videos"
              if (!count) {
                const metaMatch = text.match(/"videoCountText":\{"simpleText":"(\d+) videos"\}/);
                if (metaMatch) count = parseInt(metaMatch[1], 10);
              }

              return { ...pl, videoCount: count };
            } catch {
              return { ...pl, videoCount: 0 };
            }
          })
        );

        setPlaylistData(playlistsWithCount);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load playlists', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    document.body.style.overflow = activePlaylist ? 'hidden' : 'auto';
  }, [activePlaylist]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading playlists...</p>;
  }

  if (!playlistData.length) {
    return <p className="text-center text-gray-500">No playlists available.</p>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          YouTube Playlists & Courses
        </h2>
        <p className="text-lg text-gray-600">
          Free content to help you master coding and ace interviews
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlistData.map((playlist) => (
          <button
            key={playlist.id}
            onClick={() => setActivePlaylist(playlist)}
            className="group text-left rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
          >
            <div className="relative aspect-video">
              <img
                src={playlist.firstvid}
                alt={playlist.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <PlayCircle className="w-14 h-14 text-white" />
              </div>
            </div>
            <div className="p-4">
              <p className="font-semibold text-sm line-clamp-2">
                {playlist.title}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {playlist.videoCount ?? 0} videos
              </p>
            </div>
          </button>
        ))}
      </div>

      {activePlaylist && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
          onClick={() => setActivePlaylist(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden"
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
                src={`https://www.youtube.com/embed/videoseries?list=${activePlaylist.id}&autoplay=1`}
                title={activePlaylist.title}
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
