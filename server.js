const express = require('express')
const app = express()

require('dotenv').config({silent: true})

//TODO:
//conectar o db
const db = require('./src/data/database')
db.connect()
//usar as rotas
app.use(express.json())

const lojasRouter = require('./src/routes/lojas.routes')
app.use('/lojas', lojasRouter)

const produtosRouter = require('./src/routes/produtos.routes')
app.use('/produtos', produtosRouter)

const usuariasRouter = require('./src/routes/usuarias.routes')
app.use('/usuarios', usuariasRouter)

const index = require("./src/routes/index");
app.use('/', index)

app.listen(process.env.PORT, () => console.log('listening on port 3333'))