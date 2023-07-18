import React from 'react';
import Image from 'next/image';

function BlogCard({ blog }) {
    return (
        <div className='p-4 rounded-md bg-[#fff] border-2 border-teal-300 mb-4'>
            {/* <div className='flex justify-start items-center max-w-[4rem]'>
                <Image
                    src={blog?.blogger?.image}
                    className='object-contain rounded-full'
                    width={50}
                    height={50}
                />
            </div> */}
            <div className='text-sm'>
                <div className='mb-4'>
                    <p className='text-ellipsis'>
                        {blog?.length <= 100
                            ? blog?.blog
                            : blog?.blog.slice(0, 345) + '...'}
                        {/* {blog?.blog} */}
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
                        />
                        <p>{blog?.blogger?.username}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogCard;
