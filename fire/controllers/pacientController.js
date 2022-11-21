'use strict';

const firebase = require('../db');
const Student = require('../models/student');
const firestore = firebase.firestore();


const addPacient = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('pacients').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllPacients = async (req, res, next) => {
    try {
        const pacients = await firestore.collection('pacients');
        const data = await pacients.get();
        const pacientsArray = [];
        if(data.empty) {
            res.status(404).send('No pacient record found');
        }else {
            data.forEach(doc => {
                const pacient = new Pacient(
                    doc.id,
                    doc.data().name,
                    doc.data().lastName,
                    doc.data().birthdate,
                    doc.data().cellphone,
                    doc.data().city,
                    doc.data().municipalty,
                    doc.data().address,
                    doc.data().rh,
                    doc.data().height,
                    doc.data().weight,
                    doc.data().allergies
                );
                pacientsArray.push(pacient);
            });
            res.send(pacientsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPacient = async (req, res, next) => {
    try {
        const id = req.params.id;
        const pacient = await firestore.collection('pacients').doc(id);
        const data = await pacient.get();
        if(!data.exists) {
            res.status(404).send('Pacient with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatePacient = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const pacient =  await firestore.collection('pacients').doc(id);
        await pacient.update(data);
        res.send('Pacient record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletePacient = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('pacient').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addPacient,
    getAllPacients,
    getPacient,
    updatePacient,
    deletePacient
}