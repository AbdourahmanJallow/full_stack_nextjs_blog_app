'use client';

import { useState, useEffect } from 'react';
import BlogCard from './BlogCard';

const BlogList = ({ blogs }) => {
    return (
        <div className='grid grid-cols-1 place-content-center mt-8'>
            {blogs?.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
            ))}
        </div>
    );
};

function Timeline() {
    const [blogs, setBlogs] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const getBlogs = async () => {
            const response = await fetch('/api/blog');
            const data = await response.json();
            setBlogs(data);
        };

        getBlogs();
        console.log(blogs);
    }, []);
    return (
        <section className='max-w-3xl flex flex-col justify-center items-center mt-16'>
            <form className='max-w-xs'>
                <input
                    type='text'
                    placeholder='Search by topic...'
                    className='py-2 px-6 border-2 border-teal-200 rounded-md w-full text-[#333] text-sm'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </form>
            <BlogList blogs={blogs} />
        </section>
    );
}

export default Timeline;
