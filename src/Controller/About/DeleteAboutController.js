const prisma = require("../../prisma");

class DeleteAboutController{
    async execute(){
        const deleteAbout = await prisma.about.deleteMany();
        return res.json({ok:true});
    }
}

module.exports = {DeleteAboutController};