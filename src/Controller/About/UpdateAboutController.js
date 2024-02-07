const prisma = require("../../prisma");
const {DeletePhoto} = require("../../Middlewares/FirebaseStorageMiddleware");


class UpdateAboutController {
    async execute (req, res) {
        const {Nick, Name, Title, About1, About2, Id  } = req.body;

        if ( !Nick || !Name || !Title || !About1 || !About2 || !Id){
            throw new Error ('Envie todos os campos.');
        }

        const exist = await prisma.about.findFirst({
            where:{
                Id:Id
            },select:{
                ProfilePhoto:true
            }
        });

        if (!exist){
            throw new Error ('Este nome de usuário não existe.')
        }

        let image = '';

        try{
            const {firebaseUrl} = req.file;
            image = firebaseUrl;
            DeletePhoto(exist.ProfilePhoto)
        }catch(err){
            image = exist.ProfilePhoto
        }


        const updateAbout = await prisma.about.update({
            where:{
                Id:Id
            },
            data:{
                Nick,
                Name,
                Title,
                About1,
                About2,
                ProfilePhoto:image
            }
        });

        return res.json(updateAbout);
    }
} 

module.exports = {UpdateAboutController}