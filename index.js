import express from 'express'
import App from './src/utils/App.js'
import dotenv from "dotenv";
dotenv.config();
const app = express()
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

App(app, express)

