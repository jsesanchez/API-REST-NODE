const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;
const app = express();

app.use(bodyParser.json());

//Routes
app.use(require('./src/controller/APIController'));

//ErrorHandler
app.use((err, req, res, next)=>{
    res.send({error: err.message});
});

app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)});
