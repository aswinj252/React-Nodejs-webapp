const jwt = require('jsonwebtoken')
const maxAge = 0 * 0 * 0 * 5
const key = "WebAppSecretKey"
// const adminToken = jwt.sign({ username: admin.username, email: admin.email }, 'myWebAppSecretKey123',{expiresIn:maxAge})



const createToken = (name, email) => {
    jwt.sign({ name: name, email: email }, key, { expiresIn: 3600000 })
}


module.exports = createToken;