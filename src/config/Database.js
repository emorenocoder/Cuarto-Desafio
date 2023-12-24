import mongoose from 'mongoose';

const connectDB = async () => {
    const mongoURL = process.env.MONGODB_ATLAS;
    if (!mongoURL) {
        throw new Error('MONGODB_ATLAS connection URL is not defined in environment variables.');
    }
   
    try {
        await mongoose.connect(mongoURL)
            .then(() => console.log('DB Connected'))
            .catch(err => console.log(err));
    
    } catch(err) {
        console.log('Error connecting to MongoDB:', err.message);
        throw new Error('Error initializing database connection.');
    }
}

export default connectDB;