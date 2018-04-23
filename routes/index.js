import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {res.json('Hai')});

module.exports = router;
