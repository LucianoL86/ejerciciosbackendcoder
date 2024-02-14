import passport from 'passport'
import GithubStrategy from 'passport-github2'
import userService from '../DAOs/mongodb/models/users.model.js'
import { clientID, clientSecret, callbackURL } from './index.config.js';

const initializePassport = () => {

    passport.use(
        'github',
        new GithubStrategy(
            {
                clientID,
                clientSecret,
                callbackURL,
            },
            async (profile, done) => {
                try {
                    const user = await userService.findOne({ email: profile?.emails[0]?.value })
                    if (!user) {
                        const newUser = {
                            first_name: profile.displayName.split(' ')[0],
                            last_name: profile.displayName.split(' ')[1],
                            email: profile?.emails[0]?.value,
                            age: 18,
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
    passport.deserializeUser(async (_id, done) => {
        try {
            const user = await userService.findById(_id)
            done(null, user)
        } catch (error) {
            done(error, null)
        }
    })
}

export default initializePassport