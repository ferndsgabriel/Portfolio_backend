const prisma = require('../../prisma');

class CreateAboutController{
    async execute(req, res){
        const {Nick, Name, Title, About1, About2, ProfilePhoto  } = req.body;

        if (!Nick || !Name || !Title || !About1 || !About2 ){
            throw new Error("Send all fields.")
        }

        const nickExist = await prisma.about.findFirst({
            where:{
                Nick:Nick
            }
        });

        if (nickExist){
            throw new Error("This username already exists.")
        }

        const {firebaseUrl} = req.file;

        if (!firebaseUrl){
            throw new Error("Image not found.")
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