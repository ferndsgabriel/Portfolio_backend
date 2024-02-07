const prisma = require("../../prisma");

class CreateSkillsController{
    async execute(req, res){
        const { Name } = req.body;

        if (!Name){
            throw new Error ("Digite o nome.");
        }

        const exist = await prisma.skills.findFirst({
            where:{
                Name:Name
            }
        });

        if (exist){
            throw new Error('Skills já existe.')
        }

        let image = ''

        try{
            const {firebaseUrl} = req.file;
            image = firebaseUrl
        }catch(err){
            console.log(err)
        }

        if (image === ''){
            throw new Error ('Icon img não encontrado.');
        }

        const createSkills = await prisma.skills.create({
            data:{
                Name:Name,
                Icon:image
            }
        });

        return res.json(createSkills);

    }
}

module.exports = {CreateSkillsController}