import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

interface User {
    _id: string;
    name: string;
    email: string;
    pic: string;
}

interface UserCardProps {
    user: User;
}

const getUserDetails = async (userId: string) => {
    const response = await axios.get(`/api/user/${userId}`);
    return response.data;
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const { data: userData, isLoading, isError } = useQuery(['user', user._id], () => getUserDetails(user._id));

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !userData) {
        return <div>Error fetching user data.</div>;
    }

    const PF = "http://localhost:8000/";
    const defaultImg =
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

    // const imageUrl = user.pic ? `${PF}${user.pic.replace(/\\/g, '/')}` : defaultImg;
    const imageUrl = user.pic ? user.pic : defaultImg;

    return (
        <div className="border p-4 rounded shadow flex">
        <div className="w-1/4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
                <img src={imageUrl} alt={user.name} className="object-cover w-full h-full" />
            </div>
        </div>
        <div className="w-3/4 pl-4">
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-gray-500">{user.email}</p>
        </div>
    </div>
    );
};

export default UserCard;
