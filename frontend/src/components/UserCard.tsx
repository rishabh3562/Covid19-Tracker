import React from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  pic: string;
}

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="border p-4 rounded shadow">
      <img src={user.pic} alt={user.name} className="w-full h-auto mb-2" />
      <h3 className="text-xl font-semibold">{user.name}</h3>
      <p className="text-gray-500">{user.email}</p>
    </div>
  );
};

export default UserCard;
