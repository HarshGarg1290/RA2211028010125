import React from "react";

interface UserCardProps {
  name: string;
  postCount: number;
  avatar?: string;
  bio?: string;
}

const UserCard: React.FC<UserCardProps> = ({ 
  name, 
  postCount, 
  avatar, 
  bio = "No bio available" 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center">
          {avatar ? (
            <img 
              src={avatar} 
              alt={`${name}'s avatar`} 
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center text-white text-xl font-bold">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          
          <div className="ml-5">
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            <div className="flex items-center mt-1">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {postCount} {postCount === 1 ? 'post' : 'posts'}
              </span>
              <button className="ml-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
                Follow
              </button>
            </div>
          </div>
        </div>
        
        <p className="mt-4 text-gray-600 text-sm">{bio}</p>
        
        <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-lg font-semibold text-gray-900">{postCount}</p>
            <p className="text-xs text-gray-500">Posts</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">128</p>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">86</p>
            <p className="text-xs text-gray-500">Following</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;