const connection = require('../../DB_Connection/connection');
const express  = require ('express');
//const service = {};
function conn(){
    return connection();
}
const app = express();
module.exports = {


ListarAll: function ListarAll (req,res)  {
    conne=conn();
    const sql = 'SELECT * FROM location';
    conne.query(sql,(error, results)=>{
        if(error) throw error;
        if(results.length >0) {
           //res.json(results);
            //console.log("Entro ALL y listo ", results)
        }else{
            //res.send("No Location");
            //console.log("No Locations");
        }
    });
},


ListarID: function ListarID (req,res) {
    conne=conn();
    const {id} = req.params;
    const sql = `SELECT * FROM location WHERE id='${id}'`;
    conne.query(sql,(error, results)=>{
        if(error) throw error;
        if(results.length >0) {
            //res.json(results);
            //console.log("Entro ID y listo ", results)
        }else{
            //res.send("No Location ID");
            //console.log("No Location ID");
        }
    });
},

add: function add (req,res) {
    conne=conn();
    const sql = 'INSERT INTO location SET ?';
    const locationObj = {
        name: req.body.name,
        area_m2: req.body.area_m2
    };
    conne.query(sql,locationObj,(error,result)=>{
        if(error) throw error;
        //res.send("OK");   
        console.log("OK");
    });
},


update: function update  (req,res) {
    conne=conn();
    const {id}=req.params;
    const{name, area_m2} = req.body;
    const sql =`UPDATE location SET name = '${name}', area_m2 ='${area_m2}' WHERE id='${id}'`;
    conne.query(sql,error=>{
        if(error) throw error;
        //res.send("OK UPDATE");
        //console.log("UPDATE");   
   });
},

delate: function delate (req,res) {
    conne=conn();
    const {id}=req.params;
    const sql = `DELETE FROM location WHERE id = '${id}'`;
    conne.query(sql,(error, result)=>{
        if(error) throw error;
        //res.send("OK DELETE");
        //console.log("DELETE");
    });
},
calculadora: function caluladora (req,res) {
    const {id}=req.params;
    const{num1, num2} = req.body;  
    if(Number(id) === 1){
        rta = Number(num1) + Number(num2);
        //res.body = String(rta)
        console.log(rta);
        res.send(res.body);
        return Number(rta);
    } else if(Number(id) === 2){
        rta = Number(num1) - Number(num2);
        res.body = String(rta)
        console.log(rta);
        res.send(res.body);
        return rta;
    } else if(Number(id) === 3){
        rta = Number(num1) * Number(num2);
        res.body = String(rta)
        console.log(rta);
        res.send(res.body);
        return rta;
    } else if(Number(id) === 4){
        rta = Number(num1) / Number(num2);
        res.body = String(rta)
        console.log(rta);
        res.send(res.body);
        return Number(rta);
    } 
    
}

}
//module.exports =service;
//module.exports =delate,caluladora,update,add,ListarID,ListarAll,conn;