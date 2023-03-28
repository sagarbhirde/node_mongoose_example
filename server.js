const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://mongosample:OAKVKSwTLdnUjyO1@test.xa9lb2l.mongodb.net/sample_analytics?retryWrites=true&w=majority', { useNewUrlParser :true})
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open', () => console.log('Connected to database'))


app.use(express.json())

const analyticsAccounts =  require('./analytics/accounts')

app.use('/analytics',analyticsAccounts)

app.listen(3000, () => console.log('Server Started'))

