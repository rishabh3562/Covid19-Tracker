import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  pic: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
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
const ContactsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [users, setUsers] = useState<User[]>([]);

  useQuery(
    'users',
    () =>
      axios.get('/').then((res) => {
        console.log('res', res.data);
        setUsers(res.data.data); // Assuming the user data is stored in res.data.data
      }),
    {
      onError: (error) => {
        console.error('Error fetching users:', error);
      },
    }
  );

  const addUserMutation = useMutation(
    (newUser: User) => axios.post('/api/user/signup', newUser),
    {
      onError: (error) => {
        console.error('Error adding user:', error);
      },
    }
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: User = {
      _id: '',
      name,
      email,
      password,
      pic: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
      isAdmin: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
    };

    await addUserMutation.mutateAsync(newUser);
    queryClient.invalidateQueries('users');
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Contacts</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Add New User</h3>
        <form onSubmit={handleAddUser} className="flex space-x-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-1/4"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-1/4"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-1/4"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add User
          </button>
        </form>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">User List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user: User) => (
             <UserCard key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
