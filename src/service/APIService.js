const connection = require('../../DB_Connection/connection');
const conn =connection();


const service = {};

service.ListarAll = (req,res) => {
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


service.ListarID = (req,res) => {
    const {id} = req.params;
    const sql = `SELECT * FROM location WHERE id='${id}'`;
    conn.query(sql,(error, results)=>{
        if(error) throw error;
        if(results.length >0) {
            res.json(results);
        }else{
            res.send("No Location ID");
        }
    });
}

service.add = (req,res) =>{
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


service.update = (req,res) =>{
    const {id}=req.params;
    const{name, area_m2} = req.body;
    const sql =`UPDATE location SET name = '${name}', area_m2 ='${area_m2}' WHERE id='${id}'`;
    conn.query(sql,error=>{
        if(error) throw error;
        res.send("OK UPDATE");   
   });
}

service.delete = (req,res) =>{
    const {id}=req.params;
    const sql = `DELETE FROM location WHERE id = '${id}'`;
    conn.query(sql,(error, result)=>{
        if(error) throw error;
        res.send("OK DELETE");
    });
}


module.exports =service;