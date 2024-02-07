const prisma = require("../../prisma");
const  {DeletePhoto} = require("../../Middlewares/FirebaseStorageMiddleware");

class DeleteSkillsController{
    async execute(req, res){
        const { Id } = req.body;

        if (!Id){
            throw new Error ("Digite o Id.");
        }

        const exist = await prisma.skills.findFirst({
            where:{
                Id:Id
            },select:{
                Icon:true
            }
        });
        
        if (!exist){
            throw new Error('Skills não econtrada.')
        }

        const iconDeleteInFirebase = exist.Icon;

        const deleteSkill = await prisma.skills.delete({
            where:{
                Id:Id
            }
        });
        DeletePhoto(iconDeleteInFirebase);

        return res.json(deleteSkill);

    }
}

module.exports = {DeleteSkillsController}