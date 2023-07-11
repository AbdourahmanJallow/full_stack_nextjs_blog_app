import Image from 'next/image';
import Timeline from '@/components/Timeline';

export default function Home() {
    return (
        <section className='flex w-full min-h-screen flex-col items-center justify-start p-24'>
            <h1 className='sm:text-5xl text-2xl text-center font-semibold text-[#555]'>
                <span className='text-teal-300'>
                    {' '}
                    Express Yourself! <br className='max-md:hidden' />
                </span>{' '}
                Unleash Your Thoughts and Ideas <br /> with Our Blogging App!
            </h1>

            <Timeline />
        </section>
    );
}
