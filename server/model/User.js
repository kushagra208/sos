import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        reqired: true,
        unique: true
    },
    DOB:{
        type: Date,
    },
    avatar:{
        type: String,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        minLength: [8, 'password must be atleast 8 characters long'],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    verified:{
        email: {
            status: {
                type: Boolean,
                default: false
            },
            otp: Number,
            otp_expiry: Date
        },
        phone: {
            status: {
                type: Boolean,
                default: false
            },
            otp: Number,
            otp_expiry: Date
        },
    },
    flags: {
        type: Number,
        default: 0
    },
    location: {
        type: String,
        required: true
    },
    resetPasswordOTP: Number,
    resetPasswordOTPExpiry: Date,
})


UserSchema.pre("save" , async function (next) {
    if(!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.methods.getJWTToken = function() {
    return jwt.sign({_id: this._id} , process.env.JWT_SECRET , {
        expiresIn: process.env.JWT_COOKIE_EXPIRE*24*60*1000,
    });
}

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password , this.password);
}
const User = mongoose.model("User", UserSchema)

export default User;