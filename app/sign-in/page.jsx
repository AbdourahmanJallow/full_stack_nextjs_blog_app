'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { BsBoxArrowRight, BsGithub, BsBoxArrowInRight } from 'react-icons/bs';
import { MdPostAdd } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { usePathname } from 'next/navigation';

function SignIn() {
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
        <section className='flex-col flex_center border-2 border-[#888] p-2'>
            <div className='mb-8'>
                <h1 className='text-5xl font-bold'>
                    Sign In To <span className='text-teal-300'>BlogVerse</span>
                </h1>
            </div>

            <div>
                <p className='mb-2'>Continue with</p>
                <div className='flex flex-col gap-5'>
                    {providers &&
                        Object.values(providers).map((provider) => (
                            <button
                                type='button'
                                className='outline_btn font-semibold'
                                onClick={() => signIn(provider.id)}
                                key={provider.name}
                            >
                                {provider.name.toLowerCase() === 'google' ? (
                                    <FcGoogle
                                        size={25}
                                        className='inline-block mx-2'
                                    />
                                ) : (
                                    <BsGithub
                                        size={25}
                                        className='inline-block mx-2'
                                    />
                                )}
                                {provider.name}
                            </button>
                        ))}
                </div>
            </div>
        </section>
    );
}

export default SignIn;
