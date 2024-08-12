import userModel from '../model/userModel.js';
import {generateOTP,hashPassword} from '../common/auth.js'
import {sendOtpMail} from '../common/nodemailor.js'

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                message: 'User not found'
            })
        }

        const otp = generateOTP()
        user.otp = otp
        user.otpExpiry = Date.now() + 600000
        await user.save()

        const emailContent = `Here is your one-time password (OTP) for verification: ${otp}.
        This code is valid for the next 10 Munites. Please use it to complete your request.
         If you didn’t request this, please ignore this email.`
        await sendOtpMail(email, emailContent)

        res.status(200).send({
            message: 'Password reset email sent'
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { otp, newPassword } = req.body

        console.log(otp)

       
        const user = await userModel.findOne({
            otp,
            otpExpiry: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).send({
                message: 'Invalid or expired OTP'
            })
        }

        const hashedPassword = await hashPassword(newPassword)
        user.password = hashedPassword
        user.otp = null
        user.otpExpiry = null
        await user.save()

        res.status(200).send({
            message: 'Password reset successfully'
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
};

export default {
    forgotPassword,
    resetPassword
};
