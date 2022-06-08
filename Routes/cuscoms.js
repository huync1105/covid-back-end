const express = require('express');
const router = express.Router();
const Cuscom = require('../models/cuscom');

router.get('/', async (req, res) => {
  Cuscom.find((err, arr) => {
    res.json(arr);
  })
})

router.post('/', async (req, res) => {
  const cuscom = new Cuscom({
    ...req.body
  })
  try {
    const addCom = await cuscom.save();
    res.json(addCom);
  } catch (err) {
    res.json({ message: err });
  }
})

module.exports = router;