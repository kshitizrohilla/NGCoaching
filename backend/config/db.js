const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${connect.connection.host}`.cyan.bold)
    } catch(error) {
        console.log(`Error: (Maybe internet not connected) ${error.message}`.red.underline);
        process.exit();
    }
}

module.exports = connectDB