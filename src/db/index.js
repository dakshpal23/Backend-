import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const ConnectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`MONGODB CONNECTED !! DB HOST: ${connectionInstance.connection.host}`);     // 🧠 MongoDB kis host (machine/server) pe connect hui, uska naam batata hai

        
    } catch (error) {
        console.log(`Error aa gya Ustaad: ${error}`);
        process.exit(1);        // ⚠️ Kuch gadbad ho gayi, isliye ab program ko turant band kar do

    }
}

export default ConnectDB