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
        "https://c4.wallpaperflare.com/wallpaper/72/624/1004/anime-one-piece-zoro-roronoa-wallpaper-preview.jpg";

    const imageUrl = user.pic ? `${PF}${user.pic.replace(/\\/g, '/')}` : defaultImg;

    const myObject = {
        user: user.email,
        imageUrl: imageUrl,
        'user.pic': user.pic,
        PF: PF,
        'userPicReplaced': user.pic.replace(/\\/g, '/'),
        defaultImg: defaultImg
    };

    console.log(myObject);

    return (
        <div className="border p-4 rounded shadow">
            <img src={user.pic} alt={user.name} className="w-full h-auto mb-2" />
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-gray-500">{user.email}</p>
        </div>
    );
};

export default UserCard;
