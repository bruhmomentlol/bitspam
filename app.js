import 'dotenv/config'
import express from 'express'
import bodyParser from "body-parser";
import "./models/con.js"
export const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))