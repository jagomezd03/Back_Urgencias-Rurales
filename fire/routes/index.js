const express = require('express');
const pacientRouter = require('../controllers/pacientController');
const doctorRouter = require('../controllers/doctorController');
const companionRouter = require('../controllers/companionController');
const diagnosticRouter = require('../controllers/diagnosticController');
const consultationRouter = require('../controllers/consultationController');
const medicineRouter = require('../controllers/medicineController');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/pacients', pacientRouter);
    router.use('/doctors', doctorRouter);
    router.use('/companions', companionRouter);
    router.use('/diagnostics', diagnosticRouter);
    router.use('/consultations', consultationRouter)
    router.use('/medicines', medicineRouter)
}

module.exports = routerApi;