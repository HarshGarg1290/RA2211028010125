import { useEffect, useState } from "react";
import { fetchTopUsers } from "../services/api";
import UserCard from "../components/UserCard";

interface User {
  userId: string;
  name: string;
  postCount: number;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchTopUsers().then(setUsers);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Top Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user.userId} name={user.name} postCount={user.postCount} />
        ))}
      </div>
    </div>
  );
}
