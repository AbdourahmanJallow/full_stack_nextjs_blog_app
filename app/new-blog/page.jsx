'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@/components/Form';

function NewBlog() {
    const { data: session } = useSession();
    const [sending, setSending] = useState(false);
    const [post, setPost] = useState({
        blog: '',
        category: ''
    });

    const router = useRouter();

    const createBlog = async (e) => {
        e.preventDefault();
        setSending(true);

        try {
            const response = await fetch('/api/blog/new', {
                method: 'POST',
                body: JSON.stringify({
                    userId: session?.user?.id,
                    blog: post.blog,
                    category: post.category
                })
            });

            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log('Failed to create blog:' + error);
        } finally {
            setSending(false);
        }
    };

    return (
        <section className='w-full flex justify-center items-center '>
            <Form
                type='New'
                post={post}
                setPost={setPost}
                sending={sending}
                handleFormSubmit={createBlog}
            />
        </section>
    );
}

export default NewBlog;
