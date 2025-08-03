import express from 'express'
import App from './src/utils/App.js'

const app = express()
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

App(app, express)
