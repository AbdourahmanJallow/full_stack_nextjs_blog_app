'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@/components/Profile';

function MyProfile() {
    const { data: session } = useSession();
    const [blogs, setBlogs] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const getBlogs = async () => {
            const response = await fetch(
                `/api/users/${session?.user?.id}/blogs`
            );
            const data = await response.json();
            setBlogs(data);
        };

        getBlogs();
    }, []);

    const editBlog = async (blog) => {
        router.push(`/edit-blog?id=${blog?._id}`);
    };

    const deleteBlog = async (blog) => {};

    return (
        <Profile
            name='My'
            blogs={blogs}
            handleEdit={editBlog}
            handleDelete={deleteBlog}
        />
    );
}

export default MyProfile;
