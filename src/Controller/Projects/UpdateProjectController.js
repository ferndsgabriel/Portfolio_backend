const prisma = require("../../prisma");
const {DeletePhoto} = require("../../Middlewares/FirebaseStorageMiddleware");


class UpdateProjectController {
    async execute (req, res) {
        const {Deploy, Name, GitHub, Description, Id} = req.body;

        if (!Deploy || !Name || !GitHub || !Description || !Id ){
            throw new Error ('Envie todos os campos.');
        }

        const exist = await prisma.projects.findFirst({
            where:{
                Id:Id
            },select:{
                Image:true
            }
        });

        if (!exist){
            throw new Error ('Este projeto não existe.')
        }

        let image = '';
        
        if (req.file){
            const {firebaseUrl} = req.file;
            image = firebaseUrl
        }else{
            image = exist.Image;
        }


        const updateProject = await prisma.projects.update({
            where:{
                Id:Id
            },
            data:{
                Deploy:Deploy,
                Description:Description,
                GitHub:GitHub,
                Name:Name,
                Image:image
            }
        });

        return res.json(updateProject);
    }
} 

module.exports = {UpdateProjectController}