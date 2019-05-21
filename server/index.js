require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const { SERVER_PORT, SESSION_SECRET } = process.env
const checkForSession = require('./middlewares/checkForSession')
const sc = require('./controllers/swagController')
const ac = require('./controllers/authController')
const cc = require('./controllers/cartController')
const searchCtrl = require('./controllers/searchController')



app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

app.get('/api/swag', sc.read)
app.post('/api/login', ac.login)
app.post('/api/register', ac.register)
app.post('/api/signout', ac.signout)
app.get('/api/user', ac.getUser)

app.post('/api/cart/checkout', cc.checkout)
app.post('/api/cart/:id', cc.add)
app.delete('/api/cart/:id', cc.delete)

app.get('/api/search', searchCtrl.search)



app.listen(SERVER_PORT, () => {
    console.log(`magic is happening on ${SERVER_PORT}`)
})