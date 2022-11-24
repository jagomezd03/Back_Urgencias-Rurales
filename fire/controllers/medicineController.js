'use strict';

const firebase = require('../db');
const Medicine = require('../models/medicine');
const firestore = firebase.firestore();
const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('medicines').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/', async (req, res, next) => {
    try {
        const medicines = await firestore.collection('medicines');
        const data = await medicines.get();
        const pacientsArray = [];
        if(data.empty) {
            res.status(404).send('No medicine record found');
        }else {
            data.forEach(doc => {
                const medicine = new Medicine(
                    doc.id,
                    doc.data().name,
                    doc.data().lastname,
                    doc.data().serial,
                    doc.data().type,
                    doc.data().lab,
                    doc.data().dose
                );
                pacientsArray.push(medicine);
            });
            res.send(pacientsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const medicine = await firestore.collection('medicines').doc(id);
        const data = await medicine.get();
        if(!data.exists) {
            res.status(404).send('Medicine with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.patch('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const medicine =  await firestore.collection('medicines').doc(id);
        await medicine.update(data);
        res.send('Medicine record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('medicines').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;