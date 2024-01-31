import express from 'express'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import router from './routes/index.js'
import connectMongo from './db/index.js'
import dotenv from 'dotenv'
import { cookieSecret, db } from './config/index.config.js'
import mongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import session from 'express-session'


const app = express()
dotenv.config()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(cookieSecret))
app.use(express.static(__dirname + '/public'))

app.use(session({
    store: mongoStore.create({
        mongoUrl: `mongodb+srv://${db.user}:${db.pass}@${db.host}/${db.name}`,
        ttl: 15,
    }),
    secret: 'cookieSecret',
    resave: false,
    saveUninitialized: true
}))

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

connectMongo()
router(app)

export default app