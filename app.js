const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;
const app = express();

app.use(bodyParser.json());

//MYSQL Config

var connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : 'password',
    database : 'db'
  });


// Route
app.get('/',(req,res)=>{
    res.send('Welcometo my API');
});

//Listar

app.get('/location',(req,res)=>{
    const sql = 'SELECT * FROM location';
    connection.query(sql,(error, results)=>{
        if(error) throw error;
        if(results.length >0) {
            res.json(results);
        }else{
            res.send("No Location");
        }
    });
});

//Listar ID

app.get('/location/:id',(req,res)=>{
    const {id }=req.params;
    const sql = `SELECT * FROM location WHERE id = ${id}`;
    connection.query(sql,(error, result)=>{
        if(error) throw error;
        if(result.length >0) {
            res.json(result);
        }else{
            res.send("Location doesnt exist");
        }
    });
});

//Agregar

app.post('/location',(req,res)=>{
    const sql = 'INSERT INTO location SET ?';

    const locationObj = {
        name: req.body.name,
        area_m2: req.body.area_m2
    };

    connection.query(sql,locationObj,(error,result)=>{
        if(error) throw error;
        res.send("OK");   
    });
});


//editar

app.put('/location/:id',(req,res)=>{
    const {id } = req.params;
    const{name, area_m2} = req.body;
    const sql =`UPDATE location SET name = '${name}', area_m2 ='${area_m2}' WHERE id='${id}'`;

    connection.query(sql,error=>{
        if(error) throw error;
        res.send("OK UPDATE");   
    });

});

//eliminar

app.delete('/location/:id',(req,res)=>{
    const {id }=req.params;
    const sql = `DELETE FROM location WHERE id = ${id}`;
    connection.query(sql,(error, result)=>{
        if(error) throw error;
        res.send("OK DELETE");
    });
});



//Check conn
connection.connect(error =>{
  if(error) throw error;
  console.log('DB running');
  });

app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)});
