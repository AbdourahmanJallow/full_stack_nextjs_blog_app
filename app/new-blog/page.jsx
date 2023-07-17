'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@/components/Form';

function NewBlog() {
    const [sending, setSending] = useState(false);
    const [post, setPost] = useState({
        blog: '',
        category: ''
    });

    const { data: session } = useSession();
    const router = useRouter();

    const createBlog = async (e) => {
        e.preventDefault();
        setSending(true);
        console.log(post);

        try {
            const response = await fetch('/api/blog/new', {
                method: 'POST',
                body: JSON.stringify({
                    blog: post.blog,
                    userId: session?.user.id,
                    category: post.category
                })
            });
            console.log('POST');

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
