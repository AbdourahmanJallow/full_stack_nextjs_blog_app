import { Schema, models, model } from 'mongoose';

const BlogSchema = new Schema({
    blogger: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    blog: {
        type: String,
        required: [true, 'blog required...']
    },
    category: {
        type: String,
        required: [true, 'category required...']
    }
});

const Blog = models.Blog || model('Blog', BlogSchema);
export default Blog;
