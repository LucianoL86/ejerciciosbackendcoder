import dotenv from 'dotenv'

dotenv.config()


const PORT = process.env.PORT || 8080
const db = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME
}
const cookieSecret = process.env.COOKIE_SECRET

export { PORT, db, cookieSecret }