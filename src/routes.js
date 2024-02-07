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
const {DeleteContactController} = require("../src/Controller/Contacts/DeleteContactController.js");
const {UpdateContactController} = require("../src/Controller/Contacts/UpdateContactController.js");

const {CreateSkillsController} = require("../src/Controller/Skills/CreateSkillsController.js");
const {DeleteSkillsController} = require("../src/Controller/Skills/DeleteSkillsController.js");

const {CreateProjectController} = require("../src/Controller/Projects/CreateProjectController.js");
const {DeleteProjectController} = require("../src/Controller/Projects/DeleteProjectController.js");


routerApp.post('/auth', new AuthUserController().execute);

routerApp.post('/about', UserMiddleware, Multer.single('image'), FirebaseStorageMiddlewareInstace, new CreateAboutController().execute);
routerApp.delete('/about', UserMiddleware, new DeleteAboutController().execute);
routerApp.put('/about', UserMiddleware, Multer.single('image'), FirebaseStorageMiddlewareInstace, new UpdateAboutController().execute);

routerApp.post('/contact', UserMiddleware, new CreateContactController().execute);
routerApp.delete('/contact', UserMiddleware, new DeleteContactController().execute);
routerApp.put('/contact', UserMiddleware, new UpdateContactController().execute);

routerApp.post('/skills', UserMiddleware, Multer.single('image'), FirebaseStorageMiddlewareInstace, new CreateSkillsController().execute);
routerApp.delete('/skills', UserMiddleware, new DeleteSkillsController().execute);

routerApp.post('/project', UserMiddleware, Multer.single('image'), FirebaseStorageMiddlewareInstace, new CreateProjectController().execute);
routerApp.delete('/project', UserMiddleware, new DeleteProjectController().execute);






module.exports = routerApp;
