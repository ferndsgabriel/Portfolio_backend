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
        
        if (req.file){
            const {firebaseUrl} = req.file;
            image = firebaseUrl
        }else{
            image = exist.Icon;
        }

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