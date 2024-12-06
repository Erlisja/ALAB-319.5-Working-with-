// importing the express module
const express = require('express');
// import the connection to the database
const vegetableRoute = require("./routes/vegetables");

//set port
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5050;


// create your express app
const app = express();
// import the body parser
const bodyParser = require('body-parser');


// import the data from the fake db file
// const vegetables = require('./data/vegetables');
// import the vegetable model
const Vegetable = require('./model/vegetables');

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

app.use('/api/vegetables',vegetableRoute);

app.use((req,res,next)=>{
    console.log('Middleware: I run for all routes');
    next();
})


// app.get('/vege', async (req, res) => {
//     try {
//         const foundFruits = await Fruit.find({});
//         res.status(200).render('fruits/Index', { fruits: foundFruits })
//     } catch (err) {
//         res.send(err).status(400);
//     }
// })

// // E - Edit
// app.get('/fruits/:id/edit', async (req, res) => {
//     try {
//         const foundFruit = await Fruit.findById(req.params.id);
//         res.render('fruits/Edit', { fruit: foundFruit, id: req.params.id});
//     } catch (err) {
//         res.status(400).send(err);
//     }
// })


// // ============== ROUTES ==============
// // GET all vegetables
// app.get('/api/vegetables',async(req,res)=>{
   
//     try{
//         const vegetables = await Vegetable.find({});
//         res.status(200).json(vegetables);


//     }catch(error){
//         res.status(400).send(error);
//     }
// })

// // CREATE a new vegetable 
// app.post('/api/vegetables',(req,res)=>{
//     const newVegetable = req.body   
//     vegetables.push(newVegetable);
//     res.json(vegetables); 
// })

// // READ a single vegetable
// app.get('/api/vegetables/:id',(req,res)=>{
//     const id = req.params.id;
//     // check if the id exists
//     if (id <=0 || id > vegetables.length){
//         res.status(404).send('The vegetable with the given ID was not found')    
//     }else{
//         const vegetable = vegetables.find(veg => veg.id === parseInt(id));
//         res.json(vegetable);
//     }
// });



// // // DELETE a vegetable
// // app.delete('/api/vegetables/:id',(req,res)=>{
// //     const id = req.params.id;
// //     // check if the id exists
// //    if(id <=0 || id > vegetables.length){
// //     res.status(404).send("The vegetable with the given id does not exist");
// //    }else{
// //     const vegetable = vegetables.find(veg => veg.id === parseInt(id));
// //     vegetables.splice(vegetable,1);
// //     res.json(vegetables);
// //    }
// // });

// // UPDATE a vegetable
// app.put('/api/vegetables/:id',(req,res)=>{
//     const id = req.params.id;
//     // check if the id exists
//     if(id <= 0 || id> vegetables.length){
//         res.status(404).send("The vegetable with the given id does not exist");
//     }else{
//         vegetables[id] = req.body;
//         res.json(vegetables);
//     }
// })


// // PATCH a vegetable
// app.patch('/api/vegetables/:id',(req,res)=>{
//     const id = req.params.id;
//     // check if the id exists
//     if(id <= 0 || id> vegetables.length){
//         res.status(404).send("The vegetable with the given id does not exist");
//     }else{
//         vegetables[id] = {...vegetables[id], ...req.body};
//         res.json(vegetables[id]);
//     }
// })

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