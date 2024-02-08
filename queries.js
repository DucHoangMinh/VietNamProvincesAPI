import pool from "./db/index.js";
import { response} from "express";

const getAllProvinces = (request, response) => {
    pool.query('SELECT * FROM provinces',(error, result) => {
        if(error) throw error
        response.status(200).json(result.rows)
    })
}
const getDistrictInProvinceByID = (request, response) => {
    const province_id = parseInt(request.params.id)
    pool.query(`SELECT * FROM districts WHERE province_id = ${province_id}`, (error, result) => {
        if(error) throw error
        response.status(200).json(result.rows)
    })
}
const getDistrictInProvinceByProvinceName = (request, response) => {
    const provinceName = request.query.province_name
    console.log(provinceName)
    pool.query(`SELECT d.name, d.province_id, d.type, d.district_id FROM districts d, provinces p WHERE d.province_id = p.province_id AND p.name = '${provinceName}'`, (error, result) => {
        if(error) console.log(error)
        response.status(200).json(result?.rows || [])
    })
}

const getWardInDistrictByID = (request, response) => {
    const district_id = parseInt(request.params.id)
    pool.query(`SELECT * FROM wards WHERE district_id = ${district_id}` , (error, result) => {
        if(error) throw error
        response.status(200).json(result.rows)
    })
}

const getWardInDistrictByDistrictName = (request, response) => {
    const districtName = request.query.district_name
    console.log(districtName)
    pool.query(`SELECT w.ward_id, w.district_id, w.name, w.type FROM wards w, districts d WHERE w.district_id = d.district_id AND d.name = '${districtName}'`, (error, result) => {
        if(error) throw error
        response.status(200).json(result?.rows || [])
    })
}

const query = {
    getAllProvinces,
    getDistrictInProvinceByID,
    getDistrictInProvinceByProvinceName,
    getWardInDistrictByID,
    getWardInDistrictByDistrictName
}
export default query