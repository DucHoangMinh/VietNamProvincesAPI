import pool from "./db/index.js";
import { response} from "express";

const getAllProvinces = (request, response) => {
    pool.query('SELECT * FROM provinces',(error, result) => {
        if(error) throw error
        response.status(200).json(result.rows)
    })
}
const getDistrictInProvince = (request, response) => {
    const province_id = parseInt(request.params.id)
    pool.query(`SELECT * FROM districts WHERE province_id = ${province_id}`, (error, result) => {
        if(error) throw error
        response.status(200).json(result.rows)
    })
}
const getWardInDistrict = (request, response) => {
    const district_id = parseInt(request.params.id)
    pool.query(`SELECT * FROM wards WHERE district_id = ${district_id}` , (error, result) => {
        if(error) throw error
        response.status(200).json(result.rows)
    })
}
const query = {
    getAllProvinces,
    getDistrictInProvince,
    getWardInDistrict
}
export default query