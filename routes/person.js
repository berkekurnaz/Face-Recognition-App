const express = require('express');
const router = express.Router();

const personController = require('../controllers/person');


router.get('/', personController.getPersonList);

router.get('/add', personController.addPersonPage);
router.post('/add', personController.addPersonOperation);

router.get('/update/:id', personController.updatePersonPage);
router.post('/update', personController.updatePersonOperation);
router.post('/delete', personController.deletePersonOperation);

/* Person Images Routes */
router.get('/images/:personId', personController.getAllImagesByPerson); // List all images by person id

router.get('/images/delete/:personId/:id', personController.deleteImage); // Delete image by image id

router.get('/imageadd/:personId', personController.addImagePage); // Image add page
router.post('/imageadd', personController.addImageOperations);

module.exports = router;