import express from 'express';
import pool from "./db/index.js";
import { response} from "express";
import bodyParser from "express";
import query from "./queries.js";
import cors from "cors";

const port = 1507;
const app = express()
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cors())
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/provinces', query.getAllProvinces)
app.get('/districts/:id', query.getDistrictInProvinceByID)
app.get('/districts', query.getDistrictInProvinceByProvinceName)
app.get('/wards/:id', query.getWardInDistrictByID)
app.get('/wards', query.getWardInDistrictByDistrictName)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
