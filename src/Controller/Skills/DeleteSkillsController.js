const prisma = require("../../prisma");
const  {DeletePhoto} = require("../../Middlewares/FirebaseStorageMiddleware");

class DeleteSkillsController{
    async execute(req, res){
        const { Name } = req.body;

        if (!Name){
            throw new Error ("Digite o nome.");
        }

        const exist = await prisma.skills.findFirst({
            where:{
                Name:Name
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
                Name:Name
            }
        });
        DeletePhoto(iconDeleteInFirebase);

        return res.json(deleteSkill);

    }
}

module.exports = {DeleteSkillsController}