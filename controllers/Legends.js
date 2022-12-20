const { request, response } = require("express");
const { query } = require("../db/connection");
const pool = require("../db/connection");
const modelLeguends = require("../models/Legends");

const getLegends = async (req = request, res = response) => {
    let conn;

    try {
        conn = await pool.getConnection()//Realizamos la conexión

        const Legends = await conn.query(modelLeguends.queryGetLegends, (error) => {if(error) throw error})
        //console.log(Legends)
        if (!Legends) {//En caso de no haber resgistros lo informamos
            res.status(404).json({msg: "No Existe Legends Registrado"})
            return
        }
        res.json({Legends})//Se manda la lista de usuarios
    }
    catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}
const getLegendsByID = async (req = request, res = response) => {
    const {ID} = req.params//URI params
    let conn;

    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [Legends] = await conn.query(modelLeguends.queryGetLegendsByID,[ID], (error) => {if(error) throw error})

        console.log(Legends)
        if (!Legends) {//En caso de no haber resgistros lo informamos
            res.status(404).json({msg: `No Existe Legends Registrado Con El ID ${ID}`})
            return
        }

        res.json({Legends})//Se manda la lista de usuarios
    }
    catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }
}
const addLegends = async (req = request, res = response) => {
    const {Name, Description, Ability, Price, Damage, Ranges, Attack_Direction, Recharge, Family, Active} = req.body//URI params

    if(!Name || !Description || !Ability || !Price || !Damage || !Ranges || !Attack_Direction || !Recharge || !Family || 
        !Active){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }

    let conn;

    try {

        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [LegendsExist] = await conn.query(modelLeguends.queryLegendsExists, [Name], (error) =>{if(error) throw error})
        
        if (LegendsExist) {
            res.json({msg:`Legends: '${Name}' ya se encuentra registrado.`})
            return
        }
        //generamos la consulta
        const result = await conn.query( modelLeguends.queryAddLegends, [Name, Description, Ability, Price, Damage, Ranges, Attack_Direction, Recharge, Family,
            Active], (error) => {if(error) throw error})

        if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
            res.status(404).json({msg: `No se pudo agregar el nuevo Legends ${Name}`})
            return
        }
        res.json({msg:`Se agregó satisfactoriamente el legends con Nombre ${Name}`})//Se manda la lista de usuarios
        
    } catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}
const deleteLegendsByID = async (req = request, res = response) => {
    const {ID} = req.params//URI params
    let conn;

    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const result = await conn.query(modelLeguends.queryDeleteLegendsyID,[ID], (error) => {if(error) throw error})

        console.log(result.affectedRows)
        if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
            res.status(404).json({msg: `No Existe el Legends Registrado Con el ID ${ID}`})
            return
        }

        res.json({msg:`Se Eliminó Satisfactoriamente el Legends Con ID ${ID}`})//Se manda la lista de usuarios
    }
    catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }
}
const updateLegendsByLegends = async (req = request, res = response) => {
    const {Name, Description, Ability, Price, Damage, Ranges, Attack_Direction, Recharge, Family} = req.body//URI params
    console.log(!Price)
    if(!Name || !Description || !Ability || !Price || !Damage || !Ranges || !Attack_Direction || !Recharge || !Family){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión

        const [LegendsExist] = await conn.query(modelLeguends.queryLegendsExists, [Name])
        
        //generamos la consulta
            if(!LegendsExist){ 
                res.json({msg:`EL Legends ${Name} No Existe.`})
                return
            }
            const result = await conn.query(modelLeguends.queryUpdateLegendsByLegends, [Name, Description, Ability, Price, Damage, Ranges, Attack_Direction, Recharge, Family, Name], (error) => {if (error) throw error})

            if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                res.status(404).json({msg: `No Se Pudo Actualizar el Legends Con El Nombre ${Name}`})
                return
            }
            res.json({msg:`Se Actualizó Satisfactoriamente el Legends ${Name}`})//Se manda la lista de usuarios
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }
}

module.exports = {addLegends, getLegends, getLegendsByID, deleteLegendsByID, updateLegendsByLegeds}