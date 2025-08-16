import mongoose, {Schema} from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    avatar: {
        type: String,       //Cloudinary url
        required: true,
    },
    coverImage: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    refreshToken: {
        type: String,
    },
    watchHistory: [
        {
            type:Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    
},{timestamps: true})

UserSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()      // Agar password mei koi change nhi hua to password encryption change na kro

    this.password = await bcrypt.hash(this.password, 10)      // password field ko encrypyt krdega
    next();
})


UserSchema.methods.isPasswordCorrect = (async function (password) {
    return await bcrypt.compare(password, this.password)        // Password check kr rha shi hai ya nhi
})


UserSchema.methods.generateAccessToken = (async function () {
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
            
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
})

UserSchema.methods.generateRefreshToken = (async function () {
    jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
})

export const User = mongoose.model("User", UserSchema)