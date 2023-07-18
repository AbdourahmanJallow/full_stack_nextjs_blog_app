'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

function BlogCard({ blog, handleEdit, handleDelete }) {
    const { data: session } = useSession();
    const pathname = usePathname();

    return (
        <div className='p-4 rounded-md bg-[#fff] border-2 border-teal-300 mb-4'>
            <div className='text-sm'>
                <div className='mb-4'>
                    <p className='text-ellipsis'>
                        {blog?.length <= 100 && pathname !== '/profile'
                            ? blog?.blog
                            : blog?.blog.slice(0, 345) + '...'}
                    </p>
                </div>
                <div className='text-[.7rem] flex justify-between items-center w-full'>
                    <div>
                        <p>#{blog?.category}</p>
                    </div>
                    <div className='flex justify-center items-center'>
                        <Image
                            src={blog?.blogger?.image}
                            className='object-contain rounded-full inline-block mr-2'
                            width={25}
                            height={25}
                            alt='profile image'
                        />
                        <p>{blog?.blogger?.username}</p>
                    </div>
                </div>
            </div>
            {session?.user?.id === blog?.blogger._id &&
                pathname === '/profile' && (
                    <div className='flex justify-end items-center mt-5 gap-4'>
                        <button
                            type='button'
                            onClick={handleDelete}
                            className='py-1 px-4 bg-red-800 text-white rounded-md text-[.7rem]'
                        >
                            Delete blog
                        </button>
                        <button
                            type='button'
                            onClick={handleEdit}
                            className='py-1 px-4 bg-blue-400 text-white rounded-md text-[.7rem]'
                        >
                            Edit blog
                        </button>
                    </div>
                )}
        </div>
    );
}

export default BlogCard;
