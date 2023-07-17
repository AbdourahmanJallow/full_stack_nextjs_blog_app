import { connectMongoDB } from '@/utils/database';
import Blog from '@/utils/blog';

export const POST = async (req) => {
    const { userId, blog, category } = await req.json();

    try {
        await connectMongoDB();

        // create new blog and save to DB
        const newBlog = new Blog({
            blogger: userId,
            blog,
            category
        });
        await newBlog.save();
        console.log('blog created successfully');

        return new Response(JSON.stringify(newBlog), { status: 201 });
    } catch (error) {
        console.log(error);
        return new Response('Failed to create new blog', { status: 500 });
    }
};
