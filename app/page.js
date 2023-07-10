import Image from 'next/image';
import Timeline from '@/components/Timeline';

export default function Home() {
    return (
        <section className='flex w-full min-h-screen flex-col items-center justify-start p-24'>
            <h1 className='text-5xl text-center font-semibold'>
                <span className='text-teal-300 mb-7'> Express Yourself!</span>{' '}
                <br /> Unleash Your Thoughts and Ideas <br /> with Our Blogging
                App!
            </h1>

            <Timeline />
        </section>
    );
}
