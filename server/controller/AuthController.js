import User from "../model/User.js";
import { sendToken } from "../utils/sendToken.js";

export const register = async (req, res) => {
    try {
        const { email, name, password, phone } = req.body;

        const CheckEmail = await User.find({ email: email });

        const CheckPhone = await User.find({ phone: phone });

        if (CheckEmail) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        if (CheckPhone) {
            return res.status(400).json({success: false, message: "Phone already exists" });
        }


        const user = await User.create({
            name,
            email,
            password,
            phone
        });

        await sendToken(res, user, 201, "User has been created")
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne(email)

        if (!user) {
            return res.status(400).json({success: false, message: 'User does not exist. Please enter correct email!' })
        }

        const isPasswordMatch = user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(400).json({success: false, message: 'Password is incorrect' });
        }

        await sendToken(res, user, 200, 'Login Successful');
    } catch (error) {
        res.status(500).json(error)
    }
}

// export const verify = async (req, res) => {
//     try{
//         const { email, otp, emailOtp } = req.body;


//     } catch(error){
//         res.status(500).json({ message: error })
//     }
// }


// export const forgotPassword = async (req, res) => {
//     try {
//         const { email, DOB } = req.body;

//         const user = await User.findOne(email).select('+password');

//         if(!user) {
//             return res.status(400).json({ message: "No user found Please enter correct email"});
//         }

//         if(user.DOB !== DOB) {
//             return res.status(400).json({ message: "DOB is incorrect. Please try again!"});
//         }

//         const otp = Math.floor(Math.random()* 10000000);

//         user.resetPasswordOTP = otp;
//         user.resetPasswordOTPExpiry = Date.now() + 10 * 60 * 1000;

//         await user.save();

//         const message = `Your Otp for changing password is ${otp}. If you did not request for this, please ignore this email.`;

//         res.status(200).json({ message: 'Password updated successfully'});

//     } catch (error) {
//         res.status(500).json({ message: error });
//     }
// }


// export const resetPassword = async (req, res) => {
//     try {
//         const { email, }
//     } catch (error) {

//     }
// }



export const logout = async (req, res) => {
    try {
        res
            .status(200)
            .cookie("token", null, {
                expires: new Date(Date.now()),
            })
            .json({ success: true, message: "Logged Out Successfully" });
    } catch (error) {
        res.status(500).json({ success: false,  message: error })
    }
}


export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        sendToken(
            res,
            user,
            201,
            `Welcome back ${user.name}`,
        )
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
}


// export const updateProfile = async (req, res) => {
//     try {
        
//     } catch (error) {
        
//     }
// }


