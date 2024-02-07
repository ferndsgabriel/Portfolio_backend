const prisma = require("../../prisma");

class UpdateSkillsController{
    async execute(req, res){
        const {Name, Id} = req.body;

        if (!Name || !Id) {
            throw new Error('Digite todos os campos');
        }

        const exist = await prisma.skills.findFirst({
            where:{
                Id:Id
            },
            select:{
                Icon:true
            }
        });

        if (!exist){
            throw new Error ('Skill não encontrada.');
        }

        let image = '';
        try{
            const {firebaseUrl} = req.file;
            image = firebaseUrl;
            DeletePhoto(exist.Icon)
        }catch(err){
            image = exist.Icon
        }

        console.log(image)
        const updateSkill = await prisma.skills.update({
            where:{
                Id:Id
            },data:{
                Icon:image,
                Name:Name
            }
        });

        return res.json(updateSkill);
    }
}

module.exports = {UpdateSkillsController};