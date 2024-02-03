import pool from "./db/index.js";
import { response} from "express";

const getAllProvinces = (request, response) => {
    pool.query('SELECT * FROM provinces',(error, result) => {
        if(error) throw error
        response.status(200).json(result.rows)
    })
}
const query = {
    getAllProvinces
}
export default query