const prisma = require('../../prisma');

class CreateAboutController{
    async execute(req, res){
        const {Nick, Name, Title, About1, About2, ProfilePhoto  } = req.body;

        if (!Nick || !Name || !Title || !About1 || !About2 ){
            throw new Error ('Envie todos os campos.');
        }

        const nickExist = await prisma.about.findFirst({
            where:{
                Nick:Nick
            }
        });

        if (nickExist){
            throw new Error ('Este nome de usuário já existe.')
        }

        const {firebaseUrl} = req.file;

        if (!firebaseUrl){
            throw new Error ('Imagem não encontrada.')
        }

        const image = firebaseUrl;

        const createAbout = await prisma.about.create({
            data:{
                Nick, 
                Name,
                Title,
                About1,
                About2,
                ProfilePhoto:image
            }
        });

        return res.json(createAbout);
    }
}

module.exports = {CreateAboutController}