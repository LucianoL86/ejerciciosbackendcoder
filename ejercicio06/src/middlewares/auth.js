function auth(req, res, next) {
    if (req.session && req.session.admin) return next()
    else return res.sendStatus(401)
}

export default auth