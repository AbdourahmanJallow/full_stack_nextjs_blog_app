'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@/components/Form';

function NewBlog() {
    const [sending, setSending] = useState(false);
    const [blogDetails, setBlogDetails] = useState({
        blog: '',
        category: ''
    });

    const { data: session } = useSession();
    const router = useRouter();

    const createBlog = async (e) => {
        e.preventDefault();
        setSending(true);
        console.log(blogDetails);

        try {
            const response = await fetch('/api/blog/new', {
                method: 'blogDetails',
                body: JSON.stringify({
                    blog: blogDetails.blog,
                    userId: session?.user.id,
                    category: blogDetails.category
                })
            });
            console.log('blogDetails');

            if (response.ok) {
                console.log('saved');
                router.push('/');
            }
        } catch (error) {
            console.log('Failed to create blog:' + error);
        } finally {
            setSending(false);
        }
    };

    return (
        <section className='flex-col flex_center'>
            <Form
                type='New'
                blogDetails={blogDetails}
                setBlogDetails={setBlogDetails}
                sending={sending}
                handleFormSubmit={createBlog}
            />
        </section>
    );
}

export default NewBlog;
