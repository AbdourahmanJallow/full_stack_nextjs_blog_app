import { connectMongoDB } from '@/utils/database';
import Blog from '@/utils/blog';

//here define three routes to read individual blogs, update blogs and delete blogs

// Read blog (GET)
export const GET = async (req, { params }) => {
    try {
        await connectMongoDB();

        const blog = await Blog.findById(params.id).populate('blogger');

        if (!blog) return new Response('No blog found', { status: 404 });

        return new Response(JSON.stringify(blog), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Error raeding blog', { statsu: 500 });
    }
};

// Update blog (PATCH)
export const PATCH = async (request, { params }) => {
    console.log(params);
    const { blog, category } = await request.json();
    try {
        await connectMongoDB();

        const existingBlog = await Blog.findById(params.id);
        if (!existingBlog) {
            return new Response('Blog does not exist', { status: 404 });
        }

        existingBlog.blog = blog;
        existingBlog.category = category;
        existingBlog.save();

        return new Response(JSON.stringify(existingBlog), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Error updating blog', { status: 500 });
    }
};

// Delete blog (DELETE)
export const DELETE = async (req, { params }) => {
    try {
        await connectMongoDB();
        Blog.findByIdAndRemove(params.id);

        return new Response('Blog deleted succesfully', { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Error deleting blog', { status: 500 });
    }
};
