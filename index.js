// importing the express module
const express = require('express');
// import the connection to the database
const connectDB = require('./db/conn');


//set port
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5050;



// create your express app
const app = express();
// import the body parser
const bodyParser = require('body-parser');

// import the data from the fake db file
const vegetables = require('./data/vegetables');

// ============== MIDDLEWARE ==============
// middleware is code that runs between the request and the response

// parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

//  custom middleware
app.use((req,res,next)=>{
    const time = new Date();
    console.log(`-------
        ${time.toLocaleDateString()}: Received a ${req.method} request to ${req.url}.`);
    next();
});


app.use((req,res,next)=>{
    console.log('Middleware: I run for all routes');
    next();
})


// ============== ROUTES ==============
app.get('/api/vegetables',(req,res)=>{
    res.json(vegetables);
})

// CREATE a new vegetable 
app.post('/api/vegetables',(req,res)=>{
    const newVegetable = req.body   
    vegetables.push(newVegetable);
    res.json(vegetables); 
})

// READ a single vegetable
app.get('/api/vegetables/:id',(req,res)=>{
    const id = req.params.id;
    // check if the id exists
    if (id <=0 || id > vegetables.length){
        res.status(404).send('The vegetable with the given ID was not found')    
    }else{
        const vegetable = vegetables.find(veg => veg.id === parseInt(id));
        res.json(vegetable);
    }
});

// SHOW multiple vegetables
app.get('/api/vegetables',(req,res)=>{
    res.json(vegetables);
});

// DELETE a vegetable
app.delete('/api/vegetables/:id',(req,res)=>{
    const id = req.params.id;
    // check if the id exists
   if(id <=0 || id > vegetables.length){
    res.status(404).send("The vegetable with the given id does not exist");
   }else{
    const vegetable = vegetables.find(veg => veg.id === parseInt(id));
    vegetables.splice(vegetable,1);
    res.json(vegetables);
   }
});

// UPDATE a vegetable
app.put('/api/vegetables/:id',(req,res)=>{
    const id = req.params.id;
    // check if the id exists
    if(id <= 0 || id> vegetables.length){
        res.status(404).send("The vegetable with the given id does not exist");
    }else{
        vegetables[id] = req.body;
        res.json(vegetables);
    }
})

// PATCH a vegetable
app.patch('/api/vegetables/:id',(req,res)=>{
    const id = req.params.id;
    // check if the id exists
    if(id <= 0 || id> vegetables.length){
        res.status(404).send("The vegetable with the given id does not exist");
    }else{
        vegetables[id] = {...vegetables[id], ...req.body};
        res.json(vegetables[id]);
    }
})

// Custom 404 (not found) middleware
// this middleware will catch any request that did not match a route
app.use((req,res)=>{
    res.status(404);
    res.json({error: '404 Page not Found'});
})

// listen for requests
app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
})