'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@/components/Form';

function EditBlog() {
    const [sending, setSending] = useState(false);
    const [blogDetails, setBlogDetails] = useState({
        blog: '',
        category: ''
    });

    const { data: session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const blogId = searchParams.get('id');

    useEffect(() => {
        const fetchBlog = async () => {
            const response = await fetch(`/api/blog/${blogId}`);
            const data = await response.json();
            setBlogDetails({
                blog: data?.blog,
                category: data?.category
            });
        };

        if (blogId) fetchBlog();
    }, [blogId]);

    const editBlog = async (e) => {
        e.preventDefault();
        setSending(true);

        if (!blogId) alert('No blog id provided');

        try {
            const response = await fetch(`/api/blog/${blogId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    blog: blogDetails.blog,
                    category: blogDetails.category
                })
            });

            if (response.ok) {
                console.log('blog updated...');
                router.push('/');
            }
        } catch (error) {
            console.log('Failed to edit blog:' + error);
        } finally {
            setSending(false);
        }
    };

    return (
        <section className='flex_center gap-8'>
            <Form
                type='Edit'
                blogDetails={blogDetails}
                setBlogDetails={setBlogDetails}
                sending={sending}
                handleFormSubmit={editBlog}
            />
        </section>
    );
}

export default EditBlog;
