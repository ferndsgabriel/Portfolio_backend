const admin = require('firebase-admin');
const dotenv = require('dotenv');
dotenv.config();


const services = {
    type:process.env.type,
    project_id:process.env.project_id,
    private_key_id:process.env.private_key_id,
    private_key:process.env.private_key,
    client_email:process.env.client_email,
    client_id:process.env.client_id,
    auth_uri:process.env.auth_uri,
    token_uri:process.env.token_uri,
    auth_provider_x509_cert_url:process.env.auth_provider_x509_cert_url,
    client_x509_cert_url:process.env.client_x509_cert_url,
    universe_domain:process.env.universe_domain
}

admin.initializeApp({
    credential:admin.credential.cert(services),
    storageBucket:process.env.BUCKET
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


async function DeletePhoto(fileName) {
    const [url, firebaseName] = fileName.split('appspot.com/');
    try {
        const [files] = await storage.bucket().getFiles();

        for (const file of files) {
            if (file.name === firebaseName) {
                await storage.bucket().file(firebaseName).delete();
                console.log(`Arquivo ${fileName} deletado com sucesso.`);
                break; 
            }
        }
    } catch (error) {
        console.error('Erro ao listar ou deletar arquivos:', error);
    }
}




const FirebaseStorageMiddlewareInstace = FirebaseStorageMiddleware();

module.exports = {
    FirebaseStorageMiddlewareInstace,
    DeletePhoto
};