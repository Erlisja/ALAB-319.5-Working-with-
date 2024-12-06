// importing the express module
const express = require('express');
// create your express app
const app = express();
//set port
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5050;

// import the connection to the database
const vegetableRoute = require("./routes/vegetables");
const Vegetable = require('./model/vegetables');


// import the body parser
const bodyParser = require('body-parser');


// import the data from the fake db file
// const vegetables = require('./data/vegetables');
// import the vegetable model

app.use('/api/vegetables',vegetableRoute);
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