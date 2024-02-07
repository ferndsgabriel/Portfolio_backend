const prisma = require("../../prisma");
const {DeletePhoto} = require("../../Middlewares/FirebaseStorageMiddleware");

class DeleteAboutController{
    async execute(req, res){
        const getFileName = await prisma.about.findFirst();
        const nameForDeletePhoto = getFileName.ProfilePhoto;
        const deleteAbout = await prisma.about.deleteMany();
        await DeletePhoto(nameForDeletePhoto);
        return res.json(deleteAbout);
    }
}

module.exports = {DeleteAboutController};