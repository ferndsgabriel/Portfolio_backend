const admin = require('firebase-admin');
const services = require('../../config/key.json');

admin.initializeApp({
    credential:admin.credential.cert(services),
    storageBucket:'gs://portfolio-319a3.appspot.com'
});

const storage = admin.storage();
const bucket = storage.bucket();

function FirebaseStorageMiddleware (){
    return function (req, res, next) {
        const image = req.file; // Acessando diretamente req.file
        if (!image) {
            return next(); // Se não houver imagem, passe para o próximo middleware
        }
        const typeFile = image.originalname.split('.').pop();
        const fileName = `${Date.now()}.${typeFile}`; // Corrigido o formato do nome do arquivo
        const file = bucket.file(fileName);
    
        const stream = file.createWriteStream({
            metadata: {
                contentType: image.mimetype
            }
        });
    
        stream.on('error', (e) => {
            console.log(e);
            next(e);
        });
        stream.on('finish', async () => {
            await file.makePublic();
            image.firebaseUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`; // Corrigido o nome da variável
            next();
        });
    
        stream.end(image.buffer);
    }
}


const FirebaseStorageMiddlewareInstace = FirebaseStorageMiddleware()
module.exports = {FirebaseStorageMiddlewareInstace};