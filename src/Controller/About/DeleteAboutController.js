const prisma = require("../../prisma");

class DeleteAboutController{
    async execute(req, res){
        const deleteAbout = await prisma.about.deleteMany();
        return res.json({ok:true});
    }
}

module.exports = {DeleteAboutController};