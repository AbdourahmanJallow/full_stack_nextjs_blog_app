import { connectMongoDB } from '@/utils/database';
import Blog from '@/utils/blog';

export const GET = async (req, { params }) => {
    try {
        await connectMongoDB();
        const blogs = await Blog.find({ blogger: params.id }).populate(
            'blogger'
        );
        return new Response(JSON.stringify(blogs), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Error while fetching blogs', { status: 500 });
    }
};
