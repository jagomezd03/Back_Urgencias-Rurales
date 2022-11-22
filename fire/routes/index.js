const express = require('express');
const pacientRouter = require('../controllers/pacientController')


function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/pacients', pacientRouter);
  }


module.exports = routerApi;