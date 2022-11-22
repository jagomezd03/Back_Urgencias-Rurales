'use strict';

const firebase = require('../db');
const Companion = require('../models/companion');
const firestore = firebase.firestore();
const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('companions').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/', async (req, res, next) => {
    try {
        const companions = await firestore.collection('companions');
        const data = await companions.get();
        const companionsArray = [];
        if(data.empty) {
            res.status(404).send('No companion record found');
        }else {
            data.forEach(doc => {
                const companion = new Companion(
                    doc.id,
                    doc.data().name,
                    doc.data().lastname,
                    doc.data().address,
                    doc.data().city,
                    doc.data().birthdate,
                    doc.data().rh
                );
                companionsArray.push(companion);
            });
            res.send(companionsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const companion = await firestore.collection('companions').doc(id);
        const data = await companion.get();
        if(!data.exists) {
            res.status(404).send('Companion with the given ID not found');
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
        const companion =  await firestore.collection('companions').doc(id);
        await companion.update(data);
        res.send('Companion record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('companions').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;