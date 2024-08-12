import 'dotenv/config';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString()
};

export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        return await bcrypt.hash(password, salt)
    } catch (error) {
        console.error('Error hashing password:', error)
    }
};

const hashCompare = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword)
    } catch (error) {
        console.error(error)
    }
};

export default {
    generateOTP,
    hashPassword,
    hashCompare
};
