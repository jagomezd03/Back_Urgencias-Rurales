const express = require('express');
const {addPacient,
       getAllPacients,
       getPacient,
       updatePacient,
       deletePacient
      } = require('../controllers/pacientController');

const router = express.Router();

router.post('/pacient', addPacient);
router.get('/pacients', getAllPacients);
router.get('/pacient/:id', getPacient);
router.put('/pacient/:id', updatePacient);
router.delete('/pacient/:id', deletePacient);


module.exports = {
    routes: router
}