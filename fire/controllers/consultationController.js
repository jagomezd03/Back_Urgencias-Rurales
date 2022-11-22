'use strict';

const firebase = require('../db');
const Consultation = require('../models/consultation');
const firestore = firebase.firestore();
const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('consultations').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/', async (req, res, next) => {
    try {
        const consultations = await firestore.collection('consultations');
        const data = await consultations.get();
        const consultationsArray = [];
        if(data.empty) {
            res.status(404).send('No consultation record found');
        }else {
            data.forEach(doc => {
                const consultation = new Consultation(
                    doc.id,
                    doc.data().id_med,
                    doc.data().id_pac,
                    doc.data().motivo
                );
                consultationsArray.push(consultation);
            });
            res.send(consultationsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const consultation = await firestore.collection('consultations').doc(id);
        const data = await consultation.get();
        if(!data.exists) {
            res.status(404).send('Consultation with the given ID not found');
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
        const consultation =  await firestore.collection('consultations').doc(id);
        await consultation.update(data);
        res.send('Consultation record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('consultations').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;