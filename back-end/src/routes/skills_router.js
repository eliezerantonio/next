var express = require('express');
var router = express.Router();

const SkillsController = require('../controllers/skills_controller')



/* INDEX */
router.get('/', SkillsController.bindMethod('index'));

module.exports = router;