import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendOtpMail = async (to, content) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: 'Password Reset OTP',
            text: content
        });
    } catch (error) {
        console.error(error)
        throw new Error('Failed to send OTP email')
    }
};
