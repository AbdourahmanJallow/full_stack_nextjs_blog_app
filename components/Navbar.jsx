'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

function Navbar() {
    const isLoggedIn = false;
    const { data: session } = useSession();

    return (
        <nav className='flex justify-between items-center p-6 py-3 w-full mb-16 border-b-2 border-solid border-teal-100'>
            <Link href='/'>
                <Image
                    src='/assets/blog.png'
                    alt='image-logo'
                    width={105}
                    height={25}
                    className='object-contain'
                />
            </Link>

            {/* Desktop Navigation */}
            <div className='sm:flex hidden'>
                {isLoggedIn ? (
                    <div className='flex justify-evenly p-3 gap-6'>
                        <Link
                            href='/new-blog'
                            className='primary_btn font-semibold'
                        >
                            New Blog
                        </Link>
                        <button
                            type='button'
                            onCLick={signOut}
                            className='text-xl outline_btn font-bold'
                        >
                            Sign out
                        </button>
                        <Link href='/profile'>
                            <Image
                                src='/assets/profile.png'
                                alt='Profile'
                                width={30}
                                height={30}
                                className='object-contain rounded-full'
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {Object.values([1]).map((item) => (
                            <button
                                type='button'
                                className='outline_btn font-semibold'
                            >
                                Sign in
                            </button>
                        ))}
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
        </nav>
    );
}

export default Navbar;
