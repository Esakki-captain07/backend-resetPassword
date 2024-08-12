import 'dotenv/config';

export const config = {
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
};

if (!process.env.JWT_SECRET) {
    console.warn('WARNING: JWT_SECRET environment variable is not set.');
}
