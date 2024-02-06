const {Router} = require('express');
const {FirebaseStorageMiddlewareInstace} = require('./Middlewares/FirebaseStorageMiddleware.js');
const {UserMiddleware} = require('./Middlewares/UserMiddleware.js');
const multer = require('multer');

const Multer = multer({
    storage:multer.memoryStorage()
});

const routerApp = Router();

const {AuthUserController} = require('./Controller/AuthUserController.js');
const {CreateAboutController} = require('../src/Controller/About/CreateAboutController.js');

routerApp.post('/auth', new AuthUserController().execute);
routerApp.post('/about', UserMiddleware, Multer.single('image'), FirebaseStorageMiddlewareInstace, new CreateAboutController().execute);


module.exports = routerApp;
