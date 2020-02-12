if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const path = require('path')

const reportRouter = require('./routes/report')
const formRouter = require('./routes/form')
const apiv1Router = require('./routes/api-v1')

const app = express()
const PORT = 4000 || process.env.PORT

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Accept, Access-Control-Allow-Origin, Content-Type')

  next()
})

app.get('/', (req, res, next) => res.redirect('/report'))
app.use('/api/v1', apiv1Router)
app.use('/report', reportRouter)
app.use('/form', formRouter)

app.listen(PORT, () => { console.log(`Server listening at port ${PORT}`) })
