import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import UserCard from '../components/UserCard'; // Import the UserCard component
interface User {
  _id: string;
  name: string;
  email: string;
  pic: string;
}

interface UserCardProps {
  user: User;
}
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
    (user: User) => axios.post('/api/user/signup', user),
    {
      onError: (error) => {
        console.error('Error adding user:', error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    }
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: User = {
      _id: '',
      name,
      email,
      pic: '', // Leave pic empty for now, it will be set after uploading the image
    };

    const userResponse = await addUserMutation.mutateAsync(newUser);
    if (userResponse.data._id && image) {
      const imageFormData = new FormData();
      imageFormData.append('image', image);

      await axios.post(`/api/user/upload?userId=${userResponse.data._id}`, imageFormData);
    }

    queryClient.invalidateQueries('users');
    setName('');
    setEmail('');
    setPassword('');
    setImage(null);
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
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImage(e.target.files?.[0] || null)}
    className="border p-2"
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
