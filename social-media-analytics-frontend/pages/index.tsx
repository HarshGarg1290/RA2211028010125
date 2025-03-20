import { useEffect, useState } from "react";
import { fetchLatestPosts } from "../services/api";
import PostCard from "../components/PostCard";

interface Post {
  id: number;
  content: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchLatestPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Real-Time Feed</h1>
        <p className="mt-2 text-lg text-gray-600">See the latest updates as they happen</p>
      </header>
      
      {loading && posts.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-200 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-1">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts available yet</p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} content={post.content} />
            ))
          )}
        </div>
      )}
    </div>
  );
}