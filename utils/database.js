import mongoose from 'mongoose';

let mongoDbIsConnected = false;

export const connectMongoDB = async () => {
    mongoose.set('strictQuery', true);

    if (mongoDbIsConnected) {
        console.log('MongoDB is already connected');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'blogVerse',
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        mongoDbIsConnected = true;
        console.log('MongoDB is connected');
    } catch (err) {
        console.log('Could not connect to MongoDB: ' + err.message);
    }
};
