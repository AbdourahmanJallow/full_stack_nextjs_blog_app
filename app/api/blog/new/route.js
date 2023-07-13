import { connectMongoDB } from '@/utils/database';
import Blog from '@/components/Blog';

export const POST = async (request) => {
    const { userId, blog, category } = request.json();

    try {
        await connectMongoDB();

        // create new blog and save to DB
        const newBlog = new Blog({
            blogger: userId,
            blog,
            category
        });
        await newBlog.save();

        return new Response(JSON.stringify(newBlog), { status: 201 });
    } catch (error) {
        return new Response('Failed to create new blog', { status: 500 });
    }
};
