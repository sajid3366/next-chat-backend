import mongoose from "mongoose"
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };


export const connectDB = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGODB_URI, clientOptions)
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // console.log(`MongoDB connected: ${conn.Connection.host}`)
    } catch (error) {
        console.log("MongoDB connection error:", error)
    }

}