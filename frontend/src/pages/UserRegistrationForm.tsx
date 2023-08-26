import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
const baseUrl=process.env.base_url
interface UserRegistrationFormProps {
  onSuccess: () => void;
}

const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({ onSuccess }) => {
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUserMutation = useMutation((newUser: any) =>
    axios.post(`${baseUrl}/api/user`, newUser)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = { name, email, password };

    await createUserMutation.mutateAsync(newUser);
    queryClient.invalidateQueries('users'); // Invalidate the users query to refetch data
    onSuccess(); // Execute the onSuccess callback to potentially close the form or show a success message
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default UserRegistrationForm;
