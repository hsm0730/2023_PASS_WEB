const express     = require('express');
const router      = express.Router();
const xlsx        = require('xlsx');
const WifiModel   = require('../models/wifi') 

router.get('/', function(req, res) {
    res.render('wifi');
});

router.get('/:provider', async function (req, res) {
    const provider = req.params.provider;
    var result;
    if (provider=='ALL') {
        result = await WifiModel.GetAllWifis();    
    }
    else {
        result = await WifiModel.SearchWifisByProvider(provider);
    }
    if (result.error) {
        console.log(result.error);
        res.send(result.error);
    }
    else {
        res.send(result.result[0]);
    }
});

router.get('/', async function(req, res) {
    const result = await WifiModel.GetAllWifis();
    if (result.error) {
        console.log(result.error);
        res.send(result.error);
    }
    else {
        res.render('wifi', {context: result.result[0]});
    }
});

module.exports = router;