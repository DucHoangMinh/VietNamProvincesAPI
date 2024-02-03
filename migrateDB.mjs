import pool from "./db/index.js";
import axios from "axios";
let province_list = []
let district_list = []
let ward_list = []

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

const getDistricts = async (provinceID) =>{
    try{
        const { data } = await axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceID}`)
        data.results.map(item => {
            district_list.push(item)
        })
    } catch (e){
        console.log(e)
    }
}

const getWards = async (districtID) => {
    try {
        const { data } = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtID}`)
        data.results.map(item => {
            ward_list.push(item)
        })
    }catch (e){
        console.log(e)
    }
}

const migrateData = async () => {
    await getProvinces()

    //=====INSERT INTO PROVINCES TABLE=====
    // let query = 'INSERT INTO provinces(province_id,name,type) VALUES '
    // province_list.map(item => {
    //     query += `(${item.province_id}, '${item.province_name}', '${item.province_type}'),`
    // })
    // query = query.replace(/,\s*$/, "");
    // console.log("Start insert to provinces")
    // pool.query(query)
    // console.log("End insert to provinces")

    //=====INSERT INTO DISTRICT TABLE=====
    // await Promise.all(province_list.map(async (item) => {
    //     await getDistricts(item.province_id)
    // }))
    // let query = 'INSERT INTO districts(district_id,province_id,name,type) VALUES '
    // district_list.map(item => {
    //     query += `(${item.district_id}, ${item.province_id}, '${item.district_name.replace("'", "''")}','${item.district_type}'),`
    // })
    // query = query.replace(/,\s*$/, "");
    // console.log('Start migrate district list')
    // await pool.query(query)
    // console.log('Finish migrate district list')

    //=====INSERT INTO WARD TABLE=====
    await Promise.all(province_list.map(async (item) => {
        await getDistricts(item.province_id)
    }))
    await Promise.all(district_list.map(async item => {
        await getWards(item.district_id)
    }))
    let query = 'INSERT INTO wards(ward_id, district_id, name, type) VALUES '
    ward_list.map(item => {
        query += `(${item.ward_id}, ${item.district_id}, '${item.ward_name.replace("'", "''")}', '${item.ward_type}'),`
    })
    query = query.replace(/,\s*$/, "");
    await pool.query(query)
}
await migrateData()

