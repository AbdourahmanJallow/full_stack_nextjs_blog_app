'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { BsBoxArrowRight, BsGithub, BsBoxArrowInRight } from 'react-icons/bs';
import { MdPostAdd } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { usePathname } from 'next/navigation';

function Navbar() {
    const { data: session } = useSession();
    const [openDropDown, setOpenDropDown] = useState(false);
    const [providers, setProviders] = useState(null);

    const pathname = usePathname();

    useEffect(() => {
        const loadProviders = async () => {
            const response = await getProviders();
            setProviders(response);
            console.log(response);
        };

        loadProviders();
    }, []);

    return (
        <nav className='flex justify-between items-center p-6 py-1 w-full mb-16 border-b-2 border-solid border-teal-100'>
            <Link href='/'>
                <Image
                    src='/assets/blog.png'
                    alt='image-logo'
                    width={105}
                    height={25}
                    className='object-contain inline-block'
                />
                <p className='font-bold text-gray-700 inline-block text-xl ml-[-20px]'>
                    Verse
                </p>
            </Link>

            {/* Desktop Navigation */}
            <div className='sm:flex hidden'>
                {session?.user ? (
                    <div className='flex justify-evenly p-3 gap-6'>
                        {pathname === '/new-blog' ? (
                            ''
                        ) : (
                            <Link
                                href='/new-blog'
                                className='primary_btn font-semibold'
                            >
                                New Blog
                                <MdPostAdd
                                    className='ml-2 inline-block'
                                    size={25}
                                />
                            </Link>
                        )}
                        <button
                            type='button'
                            onClick={signOut}
                            className='text-xl outline_btn font-bold'
                        >
                            Sign out{' '}
                            <BsBoxArrowRight
                                className='ml-2 inline-block'
                                size={25}
                            />
                        </button>
                        <Link href='/profile'>
                            <Image
                                src={
                                    session?.user?.image
                                        ? session.user.image
                                        : `/assets/profile.png`
                                }
                                alt='Profile'
                                width={50}
                                height={50}
                                className='object-contain rounded-full'
                            />
                        </Link>
                    </div>
                ) : (
                    <div className='flex gap-3'>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    className='outline_btn font-semibold'
                                    onClick={() => signIn(provider.id)}
                                    key={provider.name}
                                >
                                    {provider.name}
                                    <BsBoxArrowInRight
                                        className='ml-2 inline-block'
                                        size={25}
                                    />
                                </button>
                            ))}
                    </div>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className='flex sm:hidden relative'>
                {session?.user ? (
                    <div className='flex flex-col'>
                        <Image
                            src='/assets/profile.png'
                            alt='Profile'
                            width={30}
                            height={30}
                            className='object-contain rounded-full'
                            onClick={() => setOpenDropDown((prev) => !prev)}
                        />
                        {openDropDown && (
                            <div className='absolute top-full right-0 flex flex-col justify-end items-end bg-[#fff] rounded-xl gap-3 mt-6 p-2 min-w-[250px] border-2 border-solid border-[#f4f4f4]'>
                                <Link
                                    href='/profile'
                                    onClick={() => setOpenDropDown(false)}
                                    className='text-sm text-teal-300'
                                >
                                    My Profile
                                </Link>
                                {pathname === '/new-blog' ? (
                                    ''
                                ) : (
                                    <Link
                                        href='/new-blog'
                                        className='text-sm text-teal-300 flex justify-center'
                                        onClick={() => setOpenDropDown(false)}
                                    >
                                        New Blog
                                        <MdPostAdd
                                            className='ml-2 inline-block'
                                            size={25}
                                        />
                                    </Link>
                                )}
                                <button
                                    type='button'
                                    onClick={() => {
                                        setOpenDropDown(false);
                                        signOut;
                                    }}
                                    className='text-sm text-teal-300 flex justify-center'
                                >
                                    Sign out
                                    <BsBoxArrowRight
                                        className='ml-2 inline-block'
                                        size={25}
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className='flex gap-3'>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    className='outline_btn font-semibold'
                                    onClick={() => signIn(provider.id)}
                                    key={provider.name}
                                >
                                    {provider.name}
                                    <BsBoxArrowInRight
                                        className='ml-2 inline-block'
                                        size={25}
                                    />
                                </button>
                            ))}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
