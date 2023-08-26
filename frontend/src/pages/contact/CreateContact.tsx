import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import UserCard from '../../components/UserCard';
const baseUrl=process.env.base_url
interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  pic: string;
}

const ContactsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const { data: users } = useQuery<User[]>('users', async () => {
    try {
      setLoading(true);
      const response = await axios.get('/'); // Replace with your API endpoint
      return response.data.data;
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  });

  const addUserMutation = useMutation(
    (user: User) => axios.post(`${baseUrl}/api/user/signup`, user), // Replace with your signup API endpoint
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
    setLoading(true);

    const newUser: User = {
      _id: '',
      name,
      email,
      password,
      pic: '',
    };

    try {
      const userResponse = await addUserMutation.mutateAsync(newUser);

      if (userResponse.data._id && image) {
        const imageFormData = new FormData();
        imageFormData.append('image', image);

        await axios.post(`${baseUrl}/api/user/upload?userId=${userResponse.data._id}`, imageFormData); // Replace with your image upload API endpoint
      }

      queryClient.invalidateQueries('users');
      setName('');
      setEmail('');
      setPassword('');
      setImage(null);
    } catch (error) {
      console.error('Error adding user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Contacts</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Add New User</h3>
        <form onSubmit={handleAddUser} className="flex flex-col md:flex-row space-x-4">
  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full">
    <input
      type="text"
      placeholder="Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="border p-2 w-full"
    />
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="border p-2 w-full"
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="border p-2 w-full"
    />
  </div>
  <div className="relative inline-flex rounded-md shadow-sm my-2">
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setImage(e.target.files?.[0] || null)}
      className="sr-only"
    />
    <label
      htmlFor="upload-image-input"
      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md justify-center"
    >
      Upload Image
    </label>
  </div>
  <button
    type="submit"
    className="bg-blue-500 text-white p-2 rounded w-full md:w-auto"
  >
    {loading ? 'Adding...' : 'Add User'}
  </button>
</form>


      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">User List</h3>
        {users && users.length !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-col-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {users.map((user: User) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        ) : (
          <p>Create users</p>
        )}
      </div>
    </div>
  );
};

export default ContactsPage;
