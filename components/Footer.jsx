import React from 'react';
import { SiMediafire } from 'react-icons/si';

function Footer() {
    return (
        <footer className='bg-teal-300 p-6 flex flex-col justify-center items-center mt-16'>
            <div className='max-w-3xl text-center'>
                <p className='font-bold text-2xl'>Welcome to Blog Verse!</p>
                <p className='text-gray-600'>
                    Connect with people and read their blogs...
                </p>
            </div>
            <div>
                <SiMediafire
                    size={40}
                    className='object-contain'
                    fill='#e25822'
                />
            </div>
        </footer>
    );
}

export default Footer;
