const mongoose = require('mongoose');
const MONGODB_CONN = process.env.MONGODB_CONN;

const connectDB = async () => {
    if (MONGODB_CONN) {
        try {
            const conn = await mongoose.connect(MONGODB_CONN)
            console.log(`Connected to MongoDB ${conn.connection.host}`['cyan']['underline']);
        } catch (error) {
            console.log(error)
            process.exit(1)
        }
    }
}

module.exports = connectDB;