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
        console.log('Seeded Vegetables:', Vegetable ); // Log inserted documents
        res.status(200).send('success');

    }catch(error){
        console.log(error);
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
});






// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const deletedVegetable= await Vegetable.findByIdAndDelete(req.params.id);
        console.log(deletedVegetable);
        res.status(200).redirect('/api/fruits');
    } catch (err) {
        res.status(400).send(err);
    }
})


// CREATE
router.post('/', async (req, res) => {
    // you should check this when you first start, but then get rid of this console.log
    // need to add logic to change the check or not checked to true or false
    if (req.body.readyToEat === 'on') { // if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { // if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }

    try {
        const createdVegetable = await Vegetable.create(req.body);
        res.status(200).redirect('/api/vegetables');
    } catch (err) {
        res.status(400).send(err);
    }
})

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