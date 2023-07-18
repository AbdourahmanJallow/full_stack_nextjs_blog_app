import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Form({
    type,
    blogDetails,
    setBlogDetails,
    sending,
    handleFormSubmit
}) {
    const onChange = (e) => {
        setBlogDetails((prev) => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const pathname = usePathname();

    return (
        <main className=''>
            <div className='font-bold flex justify-left mb-16 w-full'>
                <h2 className='text-5xl text-teal-500 text-left'>
                    {type} Blog
                </h2>
            </div>

            <form onSubmit={handleFormSubmit} className=''>
                <div className='mb-4'>
                    <input
                        type='text'
                        id='category'
                        placeholder='Blog Category'
                        required
                        className='py-1 px-2 border-2 border-teal-200 rounded-md w-full text-sm'
                        value={blogDetails.category}
                        onChange={onChange}
                    />
                </div>
                <div className='mb-4'>
                    <textarea
                        id='blog'
                        rows='10'
                        placeholder='Blog Content'
                        required
                        className='py-1 px-2 border-2 border-teal-200 rounded-md w-full text-sm'
                        value={blogDetails.blog}
                        onChange={onChange}
                    ></textarea>
                </div>
                <div className='flex justify-between items-center'>
                    <Link
                        href='/'
                        className='px-4 py-1 bg-slate-600 rounded-md text-white text-[.7rem]'
                    >
                        exit
                    </Link>
                    <button
                        type='submit'
                        disabled={sending}
                        className='px-4 py-1 bg-teal-300 rounded-md text-white text-[.7rem]'
                    >
                        {pathname === '/edit-blog' ? 'edit' : 'create'} blog
                    </button>
                </div>
            </form>
        </main>
    );
}

export default Form;
