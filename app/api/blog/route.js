import Blog from '@/utils/blog';
import { connectMongoDB } from '@/utils/database';

export const GET = async (req) => {
    try {
        await connectMongoDB();

        const blogs = await Blog.find({}).populate('blogger');

        // console.log(blogs);
        return new Response(JSON.stringify(blogs), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Failed to fetch blogs', { status: 500 });
    }
};
