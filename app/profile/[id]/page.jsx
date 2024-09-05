'use client';

import { useState, useEffect, Suspense } from 'react';
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
    <Suspense>
      <Profile
        name={`${capitalizeFirstLetter(name.split('_')[0])}'s`}
        desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
        data={userPosts}
      />
    </Suspense>
  );
};

export default UserProfile;
