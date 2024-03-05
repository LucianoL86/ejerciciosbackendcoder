import dotenv from 'dotenv'

dotenv.config()


const PORT = process.env.PORT || 8080
const db = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME
}
const coderSecret = process.env.CODER_SECRET
const clientID = process.env.GITHUB_CLIENT_ID
const clientSecret = process.env.GITHUB_CLIENT_SECRET
const callbackURL = process.env.GITHUB_CALLBACK_URL

export { PORT, db, coderSecret, clientID, clientSecret, callbackURL }