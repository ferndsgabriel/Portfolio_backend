const prisma = require("../../prisma");
const {DeletePhoto} = require("../../Middlewares/FirebaseStorageMiddleware");


class UpdateAboutController {
    async execute (req, res) {
        const {Nick, Name, Title, About1, About2  } = req.body;

        if ( !Nick || !Name || !Title || !About1 || !About2 || !Id){
            throw new Error ('Envie todos os campos.');
        }

        const exist = await prisma.about.findFirst({
            select:{
                ProfilePhoto:true,
                Id:true
            }
        });

        if (!exist){
            throw new Error ('Este nome de usuário não existe.')
        }

        let image = '';
        
        if (req.file){
            const {firebaseUrl} = req.file;
            image = firebaseUrl
        }else{
            image = exist.ProfilePhoto;
        }

        const updateAbout = await prisma.about.update({
            where:{
                Id:exist.Id
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