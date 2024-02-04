import express from 'express';
import pool from "./db/index.js";
import { response} from "express";
import bodyParser from "express";
import query from "./queries.js";

const port = 1507;
const app = express()
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/provinces', query.getAllProvinces)
app.get('/district/:id', query.getDistrictInProvince)
app.get('/ward/:id', query.getWardInDistrict)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
