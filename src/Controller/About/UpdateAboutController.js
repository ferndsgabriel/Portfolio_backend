const prisma = require("../../prisma");

class UpdateAboutController {
    async execute (req, res) {
        const {Nick, Name, Title, About1, About2, ProfilePhoto  } = req.body;

        if ( !Nick || !Name || !Title || !About1 || !About2 ){
            throw new Error ('Envie todos os campos.');
        }

        const nickExist = await prisma.about.findFirst({
            where:{
                Nick:Nick
            },select:{
                ProfilePhoto:true
            }
        });

        if (!nickExist){
            throw new Error ('Este nome de usuário não existe.')
        }

        let image = '';

        try{
            const {firebaseUrl} = req.file;
            image = firebaseUrl
        }catch(err){
            image = nickExist.ProfilePhoto
        }


        const updateAbout = await prisma.about.update({
            where:{
                Nick:Nick
            },
            data:{
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