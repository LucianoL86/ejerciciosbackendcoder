import express from 'express'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import router from './routes/index.js'
import connectMongo from './db/index.js'
import dotenv from 'dotenv'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { cookieSecret, db } from './config/index.config.js'
import passport from 'passport'
import initializePassport from './config/passport.config.js'

const app = express()
dotenv.config()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser(cookieSecret))

// Configuración de sesiones
app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${db.user}:${db.pass}@${db.host}/${db.name}`,
        ttl: 60,
    }),
    secret: 'cookieSecret',
    resave: false,
    saveUninitialized: true,
}))

// Configuración de passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// Configuración de motor de plantillas Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

connectMongo()
router(app)

export default app