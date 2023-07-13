import Link from 'next/link';

function Form({ type, post, setPost, handleFormSubmit, sending }) {
    const onChange = (e) => {
        setPost((prev) => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    return (
        <main className='max-w-3xl'>
            <div className='font-bold flex justify-left mb-16'>
                <h2 className='text-5xl text-teal-500 text-left'>
                    {type} Blog
                </h2>
            </div>

            <form onSubmit={handleFormSubmit} className='max-w-xl'>
                <div className='mb-4'>
                    <input
                        type='text'
                        id='category'
                        name='category'
                        placeholder='Blog Category'
                        className='py-1 px-6 border-2 border-teal-200 rounded-md w-full'
                        value={post.category}
                        onChange={onChange}
                    />
                </div>
                <div className='mb-4'>
                    <textarea
                        name='blog'
                        id='blog'
                        rows='10'
                        placeholder='Blog Content'
                        className='py-1 px-6 border-2 border-teal-200 rounded-md w-full'
                        value={post.blog}
                        onChange={onChange}
                    ></textarea>
                </div>
                <div className='flex justify-between items-center'>
                    <Link
                        href='/'
                        className='px-2 py-1 bg-slate-600 rounded-md text-white'
                    >
                        exit
                    </Link>
                    <button
                        type='submit'
                        disabled={sending}
                        className='px-4 py-1 bg-teal-300 rounded-md text-white'
                    >
                        create blog
                    </button>
                </div>
            </form>
        </main>
    );
}

export default Form;
