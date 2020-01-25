const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')


const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/api', routes)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))