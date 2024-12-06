const express = require('express');
const router = express.Router();
const Vegetable = require('../model/vegetables');

// ============== Temporary seed to populate the database ==============
router.get('/seed',async (req,res)=>{
    try{
        await Vegetable.create([
            {
                name: 'Carrot',
                color: 'Orange',
                price: 1.99,
                organic: true
            },
            {
                name: 'Broccoli',
                color: 'Green',
                price: 2.99,
                organic: true
            },
            {
                name: 'Cauliflower',
                color: 'White',
                price: 3.99,
                organic: false
            },
            {
                name: 'Beet',
                color: 'Red',
                price: 1.99,
                organic: true
            },
            {
                name: 'Eggplant',
                color: 'Purple',
                price: 2.99,
                organic: false
            }
        ]);
        res.status(200).redirect('/api/vegetables');

    }catch(error){
       res.status(400).send(error);
    }

})

// ============== ROUTES ==============
// GET all vegetables
router.get('/',async(req,res)=>{
   
    try{
        const vegetables = await Vegetable.find({});
        res.status(200).json(vegetables);
    }catch(error){
        res.status(400).send(error);
    }
})




// // DELETE a vegetable
// app.delete('/api/vegetables/:id',(req,res)=>{
//     const id = req.params.id;
//     // check if the id exists
//    if(id <=0 || id > vegetables.length){
//     res.status(404).send("The vegetable with the given id does not exist");
//    }else{
//     const vegetable = vegetables.find(veg => veg.id === parseInt(id));
//     vegetables.splice(vegetable,1);
//     res.json(vegetables);
//    }
// });

// // UPDATE a vegetable
// router.put('/:id',(req,res)=>{
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
// router.patch('/:id',(req,res)=>{
//     const id = req.params.id;
//     // check if the id exists
//     if(id <= 0 || id> vegetables.length){
//         res.status(404).send("The vegetable with the given id does not exist");
//     }else{
//         vegetables[id] = {...vegetables[id], ...req.body};
//         res.json(vegetables[id]);
//     }
// })

// SHOW
// another version of READ is called a show route
// in this one, we can see more information on an idividual piece of data
router.get('/:id', async (req, res) => {
    try {
        const foundVegetable = await Vegetable.findById(req.params.id);
        res.json(foundVegetable).status(200);
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;