'use client';

import { useState, useEffect } from 'react';
import Profile from '@components/Profile';
import { useSearchParams } from 'next/navigation';
import { capitalizeFirstLetter } from '@utils/other';

const UserProfile = ({ params }) => {
  console.log('Hiiiiiiii');
  const userId = params.id;

  const searchParams = useSearchParams();

  const name = searchParams.get('name');

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (userId) fetchPosts();
  }, []);

  return (
    <Profile
      name={`${capitalizeFirstLetter(name.split('_')[0])}'s`}
      desc={`Welcome to ${capitalizeFirstLetter(
        name.split('_')[0],
      )}'s profile page. Use these prompts as a starting point and customize them to fuel your own creativity!`}
      data={userPosts}
    />
  );
};

export default UserProfile;
