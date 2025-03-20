import { useEffect, useState } from "react";
import { fetchTrendingPosts } from "../services/api";
import PostCard from "../components/PostCard";
import UserCard from "../components/UserCard";

interface Post {
  id: number;
  content: string;
}

interface TrendingUser {
  id: number;
  name: string;
  postCount: number;
}

export default function Trending() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [trendingUsers, setTrendingUsers] = useState<TrendingUser[]>([
    { id: 1, name: "Alex Johnson", postCount: 42 },
    { id: 2, name: "Sam Rivera", postCount: 38 },
    { id: 3, name: "Taylor Chen", postCount: 25 }
  ]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'posts' | 'topics' | 'people'>('posts');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchTrendingPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch trending posts:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Trending</h1>
        <p className="mt-2 text-lg text-gray-600">Discover what's popular right now</p>
      </header>
      
      <div className="mb-8">
        <div className="sm:hidden">
          <select 
            className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as any)}
          >
            <option value="posts">Top Posts</option>
            <option value="topics">Trending Topics</option>
            <option value="people">Popular People</option>
          </select>
        </div>
        
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('posts')}
                className={`${
                  activeTab === 'posts'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Top Posts
              </button>
              <button
                onClick={() => setActiveTab('topics')}
                className={`${
                  activeTab === 'topics'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Trending Topics
              </button>
              <button
                onClick={() => setActiveTab('people')}
                className={`${
                  activeTab === 'people'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Popular People
              </button>
            </nav>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden p-6">
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
          ))}
        </div>
      ) : (
        <>
          {activeTab === 'posts' && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard 
                  key={post.id} 
                  content={post.content} 
                  author="User Name" 
                  timestamp="2 hours ago" 
                />
              ))}
            </div>
          )}
          
          {activeTab === 'topics' && (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
              {['Technology', 'Sports', 'Politics', 'Entertainment', 'Science', 'Health', 'Business', 'Education'].map((topic) => (
                <div key={topic} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                  <div className="font-medium text-gray-900">#{topic}</div>
                  <div className="text-sm text-gray-500 mt-1">1.2k posts</div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'people' && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {trendingUsers.map((user) => (
                <UserCard 
                  key={user.id} 
                  name={user.name} 
                  postCount={user.postCount} 
      
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}