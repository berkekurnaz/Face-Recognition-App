const express = require('express');
const router = express.Router();

const personController = require('../controllers/person');

router.get('/', personController.getPersonList);

router.get('/add', personController.addPersonPage);
router.post('/add', personController.addPersonOperation);

router.get('/update/:id', personController.updatePersonPage);
router.post('/update', personController.updatePersonOperation);
router.post('/delete', personController.deletePersonOperation);

module.exports = router;