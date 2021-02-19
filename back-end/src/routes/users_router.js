var express = require('express');
var router = express.Router();
const verifyAccessToken = require("../middlewares/verifyAccessToken_middleware");
const verifyOwner = require("../middlewares/verifyOwner_middleware");
const upload = require('../middlewares/upload_middleware')
const onlyAllowsOwner = [verifyAccessToken, verifyOwner]; //verifica se ]e dono
const UserController = require('../controllers/users_controllers')
const PortfolioController = require('../controllers/portfolios_controller')
const UserSkillsController = require('../controllers/userSkills_controller')

//LIGIN
router.post('/login', UserController.bindMethod('login'));

/* INDEX */
router.get('/', verifyAccessToken, UserController.bindMethod('index'));

/* SHOW */
router.get('/:id', UserController.bindMethod('show'));

/* STORE */
router.post('/', UserController.bindMethod('store'));

//UPDATE
router.patch('/:id', onlyAllowsOwner, upload.single('pic'), UserController.bindMethod('update'));
//REMOVE
router.delete('/:id', onlyAllowsOwner, UserController.bindMethod('remove'));


//PORTFOLIO


/* PORTFOLIO INDEX */
router.get('/:userId/portfolio', verifyAccessToken, PortfolioController.bindMethod('index'));

/* PORTFOLIO SHOW */
router.get('/:userId/portfolio/:id', verifyAccessToken, PortfolioController.bindMethod('show'));

/* PORTFOLIO STORE */
router.post('/:userId/portfolio', upload.single('pic'), onlyAllowsOwner, PortfolioController.bindMethod('store'));
//PORTFOLIO UPDATE
router.patch('/:userId/portfolio/:id', upload.single('pic'), onlyAllowsOwner, PortfolioController.bindMethod('update'));

// PORTFOLIO REMOVE
router.delete('/:userId/portfolio/:id', onlyAllowsOwner, PortfolioController.bindMethod('remove'));



//SKILL 

//SKILL STORE


/* SKILL Store */
router.post('/:userId/skill', verifyAccessToken, UserSkillsController.bindMethod('store'));

//SKILL UPDATE
router.patch('/:userId/skill/:id', onlyAllowsOwner, UserSkillsController.bindMethod('update'));

// SKILL REMOVE
router.delete('/:userId/skill/:id', onlyAllowsOwner, UserSkillsController.bindMethod('remove'));

module.exports = router;