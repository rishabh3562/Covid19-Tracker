import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getUserDetails, updateUserDetails } from '../utils/apis'; // Make sure to import your API functions
import { UserCardProps, User } from '../types';

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const queryClient = useQueryClient();
  const [thisUser, setThisUser] = useState<User>(user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);

  const { data: userData, isLoading, isError } = useQuery(['user', user._id], () =>
    getUserDetails(user._id)
  );

  const updateUserMutation = useMutation(
    (updatedUser: User) => updateUserDetails(updatedUser),
    {
      onSuccess: async (updatedData: User, variables) => {
        try {
          await queryClient.invalidateQueries(['user', variables._id]);
          setThisUser(updatedData); // Use updatedData instead of updatedUser
          setLoading(false);
          setIsEditing(false);
        } catch (error) {
          console.error('Error invalidating query:', error);
        }
      },
    }
  );
  

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
  
    const updatedUser = {
      ...thisUser,
      name: editedName,
      email: editedEmail,
    };
  
    try {
      const updatedUserData = await updateUserMutation.mutateAsync(updatedUser);
      setThisUser(updatedUserData); // Update local state with the data returned from the mutation
      queryClient.invalidateQueries(['user', user._id]);
      setLoading(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
      setLoading(false);
    }
  };
  

  const defaultImg =
    'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg';

  const imageUrl = thisUser.pic ? thisUser.pic : defaultImg;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !userData) {
    return <div>Error fetching user data.</div>;
  }

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
      {/* Your JSX for displaying user card */}
      <div className="flex flex-col items-center pt-4">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={imageUrl}
          alt={thisUser.name}
        />
          {isEditing ? (
          <>
            <input
              className="mb-2 px-3 py-2 border rounded-lg w-full"
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <input
              className="mb-2 px-3 py-2 border rounded-lg w-full"
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          </>
        ) : (
          <>
            <h5 className="mb-1 text-xl font-medium text-white-900 dark:text-white">
              {thisUser.name}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {thisUser.email}
            </span>
          </>
        )}
         <div className="flex justify-center gap-3 flex-row sm:flex-col md:flex-row md:mt-3">
        <button
          onClick={isEditing ? handleSubmit : handleEdit}
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {isEditing ? (loading ? 'Loading...' : 'Submit') : 'Edit'}
        </button>
        <button className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}>
          delete
        </button>
      </div>
        {/* Rest of your JSX */}
      </div>
    </div>
  );
};

export default UserCard;
