import passport from 'passport'
import local from 'passport-local'
import userService from '../DAOs/mongodb/models/users.models.js'
import { getHashedPassword, comparePassword } from '../utils.js'
import GithubStrategy from 'passport-github2'
import { clientID, clientSecret, callbackURL } from './index.config.js'

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use(
        'signup',
        new LocalStrategy(
            {
                passReqToCallback: true,
                usernameField: 'email',
            },
            async (req, username, password, done) => {
                const { first_name, last_name, email, age } = req.body
                try {
                    const user = await userService.findOne({ email: username })
                    if (user) {
                        req.signupSuccess = false
                        return done(null, false, { message: 'El usuario ya existe' })
                    }

                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: getHashedPassword(password)
                    }

                    let result = await userService.create(newUser)
                    req.signupSuccess = true
                    return done(null, result)

                } catch (error) {
                    return done(error)
                }
            }
        )
    )


    passport.use(
        'login',
        new LocalStrategy(
            {
                passReqToCallback: true,
                usernameField: 'email',
                passwordField: 'password',
            },
            async (req, username, password, done) => {
                try {
                    const user = await userService.findOne({ email: username })
                    if (!user) {
                        req.loginSuccess = false
                        return done(null, false, { message: 'El usuario no existe' })
                    }
                    if (!comparePassword(password, user.password)) {
                        req.loginSuccess = false
                        return done(null, false, { message: 'Contraseña incorrecta' })
                    }

                    req.loginSuccess = true
                    return done(null, user)

                } catch (error) {
                    console.log(error)
                    return done(error)
                }
            }
        )
    )

    passport.use(
        'github',
        new GithubStrategy(
            {
                clientID,
                clientSecret,
                callbackURL,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = await userService.findOne({ email: profile?.emails[0]?.value })
                    if (!user) {
                        const newUser = {
                            first_name: profile.displayName.split(' ')[0],
                            last_name: profile.displayName.split(' ')[1],
                            email: profile?.emails[0]?.value,
                            age,
                            password: Math.random().toString(36).substring(7),
                        }
                        let result = await userService.create(newUser)
                        done(null, result)
                    } else {
                        done(null, user)
                    }
                } catch (error) {
                    done(error, null)
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userService.findById(id)
            done(null, user)
        } catch (error) {
            done(error, null)
        }
    })
}


export default initializePassport
