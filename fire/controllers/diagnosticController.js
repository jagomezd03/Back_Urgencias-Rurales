'use strict';

const firebase = require('../db');
const Diagnostic = require('../models/diagnostic');
const firestore = firebase.firestore();
const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('diagnostics').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/', async (req, res, next) => {
    try {
        const diagnostics = await firestore.collection('diagnostics');
        const data = await diagnostics.get();
        const diagnosticsArray = [];
        if(data.empty) {
            res.status(404).send('No doctor record found');
        }else {
            data.forEach(doc => {
                const diagnostic = new Diagnostic(
                    doc.id,
                    doc.data().id_medic,
                    doc.data().id_inc,
                    doc.data().diagnostico
                );
                diagnosticsArray.push(diagnostic);
            });
            res.send(diagnosticsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const diagnostic = await firestore.collection('diagnostics').doc(id);
        const data = await diagnostic.get();
        if(!data.exists) {
            res.status(404).send('Diagnostic with the given ID not found');
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
        const diagnostic =  await firestore.collection('diagnostics').doc(id);
        await diagnostic.update(data);
        res.send('Diagnostic record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('diagnostics').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;