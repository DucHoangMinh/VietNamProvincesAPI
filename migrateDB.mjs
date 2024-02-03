import pool from "./db/index.js";
import axios from "axios";
let province_list = []
let district_id_list = []
let ward_id_list = []

const getProvinces = async () => {
    try {
        const { data } = await axios.get('https://vapi.vnappmob.com/api/province/')
        data.results.map(item => {
            province_list.push(item)
        })
    }catch (e){
        console.log(e)
    }
}
const migrateData = async () => {
    await getProvinces()
    let query = 'INSERT INTO provinces(province_id,name,type) VALUES '
    province_list.map(item => {
        query += `(${item.province_id}, '${item.province_name}', '${item.province_type}'),`
    })
    query = query.replace(/,\s*$/, "");
    console.log(query)
    pool.query(query)
}
await migrateData()