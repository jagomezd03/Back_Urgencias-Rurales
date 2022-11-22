'use strict';

const firebase = require('../db');
const Doctor = require('../models/doctor');
const firestore = firebase.firestore();
const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('doctors').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/', async (req, res, next) => {
    try {
        const doctors = await firestore.collection('doctors');
        const data = await doctors.get();
        const doctorsArray = [];
        if(data.empty) {
            res.status(404).send('No doctor record found');
        }else {
            data.forEach(doc => {
                const doctor = new Doctor(
                    doc.id,
                    doc.data().name,
                    doc.data().lastName,
                    doc.data().birthdate,
                    doc.data().cellphone,
                    doc.data().city,
                    doc.data().municipalty,
                    doc.data().address,
                    doc.data().rh,
                    doc.data().specialty,
                    doc.data().schedule
                );
                doctorsArray.push(doctor);
            });
            res.send(doctorsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const doctor = await firestore.collection('doctors').doc(id);
        const data = await doctor.get();
        if(!data.exists) {
            res.status(404).send('Doctor with the given ID not found');
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
        const doctor =  await firestore.collection('doctors').doc(id);
        await doctor.update(data);
        res.send('Doctor record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('doctors').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;