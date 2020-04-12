const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server is running ..."));
app.use(express.static('public'));
app.use(express.json());

const dataStorage = require('nedb');
const userData = new dataStorage('data.db');
userData.loadDatabase();

app.get('/route', (request, response) =>{
    userData.find({}, (err,data) => {
        if(err){
            console.log('err');
            response.end();
            return; 
        }
        response.json(data);
    });
});

app.post('/route', (request, response) =>{
    console.log('received request');
    userData.insert(request.body);

    response.json({
        status: 'Task Completed'
    });
});