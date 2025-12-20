import { Clock, ExternalLink, Linkedin } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LinkedInPost {
  id: string;
  title: string;
  preview: string;
  date: string;
  postLink: string;
}

export function LinkedInPosts() {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      'https://opensheet.elk.sh/1XQpGNK8aJOPE5X-gfz1Lbx9rvfVqgNjT8IGiH24tVZE/LinkedIn'
    )
      .then((res) => res.json())
      .then((data) => {
        // ✅ Defensive filtering (prevents blank page)
        const validPosts = data.filter(
          (p: LinkedInPost) =>
            p.id && p.title && p.preview && p.postLink
        );

        setPosts(validPosts);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load LinkedIn posts', err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="posts" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Recent LinkedIn Posts
          </h2>
          <p className="text-lg text-gray-600">
            Stay updated with my latest thoughts and opportunities
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">
            Loading posts...
          </p>
        )}

        {/* Posts Grid */}
        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 rounded-xl p-6 hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <Linkedin className="w-5 h-5" />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {post.date}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                  {post.preview}
                </p>

                <a
                  href={post.postLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Read full post
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <p className="text-center text-gray-500">
            No LinkedIn posts available right now.
          </p>
        )}
      </div>
    </section>
  );
}
