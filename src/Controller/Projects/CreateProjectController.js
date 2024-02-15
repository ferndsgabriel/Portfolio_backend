const prisma = require('../../prisma');

class CreateProjectController{
    async execute(req, res){
        const {Deploy, Name, GitHub, Description} = req.body;

        if (!Deploy || !Name || !GitHub || !Description ){
            throw new Error("Send all fields.")
        }

        const projectExist = await prisma.projects.findFirst({
            where:{
                Name:Name
            }
        });

        if (projectExist){
            throw new Error("This project already exists.")
        }

        let image = '';
        
        try{
            const {firebaseUrl} = req.file;
            image = firebaseUrl
        }catch(err){
            console.log('Error');
        }

        if (image === ''){
            throw new Error("Image not found.")
        }

        const createProject = await prisma.projects.create({
            data:{
                Deploy:Deploy,
                Description:Description,
                GitHub:GitHub,
                Name:Name,
                Image:image
            }
        });

        return res.json(createProject);
    }
}

module.exports = {CreateProjectController}