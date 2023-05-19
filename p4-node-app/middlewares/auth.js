const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const verify = (req, res, next) => {

    //Without a text on the header breaks the server
    const token = (req.headers.authorization ?? 'not valid').split(' ')[1] 
    const decoded = jwt.decode(token, SECRET)

    if(decoded){
        next()
    }else{
        res.status(401).send({error: 'Unauthorized'})
    }
}

module.exports = {verify}