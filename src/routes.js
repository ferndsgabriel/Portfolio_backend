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
const {DeleteAboutController} = require('../src/Controller/About/DeleteAboutController.js');
const {UpdateAboutController} = require('../src/Controller/About/UpdateAboutController.js');
const {CreateContactController} = require("../src/Controller/Contacts/CreateContactController.js");

routerApp.post('/auth', new AuthUserController().execute);

routerApp.post('/about', UserMiddleware, Multer.single('image'), FirebaseStorageMiddlewareInstace, new CreateAboutController().execute);
routerApp.delete('/about', UserMiddleware, new DeleteAboutController().execute);
routerApp.put('/about', UserMiddleware, Multer.single('image'), FirebaseStorageMiddlewareInstace, new UpdateAboutController().execute);

routerApp.post('/contact', UserMiddleware, new CreateContactController().execute);





module.exports = routerApp;
