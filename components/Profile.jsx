import React from 'react';
import BlogCard from './BlogCard';

function Profile({ name, blogs, handleEdit, handleDelete }) {
    return (
        <section className='max-w-3xl p-3'>
            <div className='mb-16'>
                <h1 className='sm:text-5xl text-xl font-bold text-teal-300 mb-10'>
                    {name} Profile
                </h1>
                <p className='text-gray-600 font-semibold'>
                    Welcome to your profile page. <br /> View your blogs, edit
                    and delete your blogs.
                </p>
            </div>

            <div className='grid grid-cols place-content-center w-full'>
                {blogs?.map((blog) => (
                    <BlogCard
                        blog={blog}
                        handleEdit={handleEdit && handleEdit(blog)}
                        handleDelete={handleDelete && handleDelete(blog)}
                    />
                ))}
            </div>
        </section>
    );
}

export default Profile;
