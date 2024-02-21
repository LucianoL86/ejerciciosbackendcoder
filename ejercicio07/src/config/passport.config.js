import passport from 'passport'
import local from 'passport-local'
import userService from '../DAOs/mongodb/models/users.models.js'
import { getHashedPassword, comparePassword } from '../utils.js'
// import GithubStrategy from 'passport-github2'
// import { clientID, clientSecret, callbackURL } from './index.config.js'

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
                const {first_name, last_name, email, age} = req.body
                try {
                    const user = await userService.findOne({ email: username })
                    if (user) {
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
                        return done(null, false, { message: 'El usuario no existe' })
                    }
                    if (!comparePassword(password, user.password)) {
                        return done(null, false, { message: 'Contraseña incorrecta' })
                    }

                    return done(null, user)

                } catch (error) {
                    console.log(error)
                    return done(error)
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    
    passport.deserializeUser(async (id, done) => {
        const user = await userService.findById(id)
        done(null, user)
    })
}


export default initializePassport

























// const initializePassport = () => {

//     passport.use(
//         'github',
//         new GithubStrategy(
//             {
//                 clientID,
//                 clientSecret,
//                 callbackURL,
//             },
//             async (profile, done) => {
//                 try {
//                     const user = await userService.findOne({ email: profile?.emails[0]?.value })
//                     if (!user) {
//                         const newUser = {
//                             first_name: profile.displayName.split(' ')[0],
//                             last_name: profile.displayName.split(' ')[1],
//                             email: profile?.emails[0]?.value,
//                             age: 18,
//                             password: Math.random().toString(36).substring(7),
//                         }
//                         let result = await userService.create(newUser)
//                         done(null, result)
//                     } else {
//                         done(null, user)
//                     }
//                 } catch (error) {
//                     done(error, null)
//                 }
//             }
//         )
//     )

//     passport.serializeUser((user, done) => {
//         done(null, user._id)
//     })
//     passport.deserializeUser(async (_id, done) => {
//         try {
//             const user = await userService.findById(_id)
//             done(null, user)
//         } catch (error) {
//             done(error, null)
//         }
//     })
// }
