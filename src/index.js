import ConnectDB from "./db/index.js";
import dotenv from 'dotenv'
import { app } from './app.js';

dotenv.config({
    path: './env'
})             // 🔐 .env file se secrets/configs load kar raha hai



ConnectDB()
.then( () => {
    app.listen(process.env.PORT , () => {
        console.log(`Server is running at PORT: ${process.env.PORT}`); 
    })
} )
.catch( (error) => {
    console.log('DB Error:',error);
} )







// import express from 'express'

// const app = express()

// ( async() => {          //using async kyuki db se data aane mei time lgta
//     try {
//         await mongoose.connect(`${process.env.MONGO_URI}/ ${DB_NAME}`)
//         app.on("error", (error) => {
//             console.log(`ERRR: ${error}`);
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`APP IS LISTNED ON PORT ${process.env.PORT}`);
//         })

//     } catch (error) {
//         console.log("ERROR:", error);
//         throw error
//     }
// } ) ()                   //BASIC APPROACH
