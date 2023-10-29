import mongoose from 'mongoose';

async function dbConnect() {
  try {
    await mongoose.connect(
      process.env.NODE_ENV === 'development'
        ? process.env.MONGODB_URI_DEV!
        : process.env.MONGODB_URI_PROD!
    );
  } catch (error) {
    throw new Error('Connection failed!');
  }
}

export default dbConnect;
