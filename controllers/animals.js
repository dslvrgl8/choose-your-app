const express = require('express');
const router = express.Router();
const startAnimals = require('../db/animalsSeedData.js')
const Animal = require('../models/animal.js')

// Post
router.post('/', async (req, res) => {
	console.log(req.body)
	req.body.extinct = req.body.extinct === 'on' ? true : false;
	const animal = await Animal.create(req.body);
	res.redirect('/animals');
});
// New
router.get('/new', (req, res) => {
	res.render('animals/new.ejs')
});

router.get('/:id/edit', async (req, res) => {
	const animal = await Animal.findById(req.params.id);
	res.render("animals/edit.ejs", {animal})
})

// Index... show all animals
router.get('/', async (req, res) => {
	// wait for this to complete
	// Animal.find is a Promise
	const animals = await Animal.find({});
	// then run the next line of code
	res.render('animals/index.ejs', {animals})
});

// Seed
router.get('/seed', async (req, res) => {
	await Animal.deleteMany({});
	await Animal.create(startAnimals);
	res.redirect('/animals');
});

// Show
router.get('/:id', async (req, res) => {
	const animal = await Animal.findById(req.params.id);
	// res.send(fruit);
	res.render('animals/show.ejs', {animal})
});

// Delete
router.delete('/:id', async (req, res) => {
	const animal = await Animal.findByIdAndDelete(req.params.id);
	res.redirect('/animals');
});


// Update
router.put('/:id', async (req, res) => {
	const id = req.params.id;
	req.body.extinct = req.body.extinct === 'on' ? true : false;
	const animal = await Animal.findByIdAndUpdate(id, req.body, {
		new: true,
	});
	res.redirect('/animals');
});

module.exports = router;
