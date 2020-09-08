const connection = require('../../DB_Connection/connection');
const conn =connection();


const controller = {};

controller.ListarAll = (req,res) => {
    const sql = 'SELECT * FROM location';
    conn.query(sql,(error, results)=>{
        if(error) throw error;
        if(results.length >0) {
            res.json(results);
        }else{
            res.send("No Location");
        }
    });
}


controller.ListarID = (req,res) => {
    const {id} = req.params;
    const sql = `SELECT * FROM location WHERE id='${id}'`;
    console.log(id);
    console.log(sql);
    conn.query(sql,(error, results)=>{
        if(error) throw error;
        if(results.length >0) {
            res.json(results);
        }else{
            res.send("No Location ID");
        }
    });
}

controller.add = (req,res) =>{
    const sql = 'INSERT INTO location SET ?';
    const locationObj = {
        name: req.body.name,
        area_m2: req.body.area_m2
    };
    conn.query(sql,locationObj,(error,result)=>{
        if(error) throw error;
        res.send("OK");   
    });
}


controller.update = (req,res) =>{
    const {id}=req.params;
    const{name, area_m2} = req.body;
    const sql =`UPDATE location SET name = '${name}', area_m2 ='${area_m2}' WHERE id='${id}'`;
    conn.query(sql,error=>{
        if(error) throw error;
        res.send("OK UPDATE");   
   });
}

controller.delete = (req,res) =>{
    const {id}=req.params;
    const sql = `DELETE FROM location WHERE id = '${id}'`;
    console.log(id);
    console.log(sql);
    conn.query(sql,(error, result)=>{
        if(error) throw error;
        res.send("OK DELETE");
    });
}


module.exports =controller;