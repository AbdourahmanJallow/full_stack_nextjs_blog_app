import React from 'react';
import Image from 'next/image';

function BlogCard({ blog }) {
    return (
        <div className='flex justify-start items-center gap-4 p-4 rounded-md bg-[#f8f8f8] mb-4'>
            <div className='flex justify-start items-center max-w-xs'>
                <Image
                    src={blog?.blogger?.image}
                    className='object-contain rounded-full'
                    width={35}
                    height={35}
                />
            </div>
            <div className='flex flex-col justify-center items-start text-sm'>
                <div className='mb-4'>
                    <p className='truncate'>
                        {blog?.length <= 100
                            ? blog?.blog
                            : blog?.blog.slice(0, 100) + '...'}
                    </p>
                </div>
                <div className='text-[.7rem] flex justify-between items-center w-full'>
                    <div>
                        <p>#{blog?.category}</p>
                    </div>
                    <div>
                        <p>{blog?.blogger?.username}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogCard;
