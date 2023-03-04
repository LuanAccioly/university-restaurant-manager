import express from "express"
import connection from "./db/connection"
import * as dotenv from "dotenv";
import routes from './routes'

dotenv.config();

const app = express()

connection();

app.use(express.json())

app.use(routes)

app.listen(3001, () => {
    console.log("User server is running")
})