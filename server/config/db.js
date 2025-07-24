const mongoose = require('mongoose');
const MONGODB_CONN = process.env.MONGODB_CONN;

const connectDB = async () => {
    if (MONGODB_CONN) {
        try {
            await mongoose.connect(MONGODB_CONN)
        } catch {
            process.exit(1)
        }
    }
}

module.exports = connectDB;