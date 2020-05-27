const express = require('express');

const db = require('../data/db-config');

const router = express.Router();

// CREATE CAR
router.post('/', async (req, res) => {
    const body = req.body;

    if (
        !body.vin || 
        !body.make || 
        !body.model || 
        !body.mileage
        ) {
            res.status(500).json({ message: 'You must provide a VIN, make, model, and mileage.' });
        }

    const newCar = await db('cars')
        .insert(body)

    if (newCar) {
        res.status(200).json(newCar);
    } else {
        res.status(500).json({ message: 'There was a problem with adding the car.' });
    }
})

// GET CARS
router.get('/', async (req, res) => {
    const cars = await db
        .select()
        .from('cars')

    if (cars) {
        res.status(200).json(cars);
    } else {
        res.status(500).json({ message: 'There was a problem with fetching the cars.' });
    }
})

// GET CAR BY ID
router.get('/:id', async (req, res) => {
    const car = await db
        .select()
        .from('cars')
        .where({ id: req.params.id })
        .first()

    if (car) {
        res.status(200).json(car);
    } else {
        res.status(500).json({ message: 'There is no car associated with the ID provided.' });
    }
})

module.exports = router;