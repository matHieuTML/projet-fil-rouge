import dotenv from 'dotenv';
dotenv.config();


const env = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI,
    TOKEN: process.env.TOKEN,
}

export { env };