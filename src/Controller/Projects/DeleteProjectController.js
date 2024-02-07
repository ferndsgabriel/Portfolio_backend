const prisma = require("../../prisma");
const  {DeletePhoto} = require("../../Middlewares/FirebaseStorageMiddleware");

class DeleteProjectController{
    async execute(req, res){
        const { Name } = req.body;

        if (!Name){
            throw new Error ("Digite o nome.");
        }

        const exist = await prisma.projects.findFirst({
            where:{
                Name:Name
            },select:{
                Image:true
            }
        });
        
        if (!exist){
            throw new Error('Projeto não econtrado.')
        }

        const imgDeleteInFirebase = exist.Image;

        const deleteProject = await prisma.projects.delete({
            where:{
                Name:Name
            }
        });
        DeletePhoto(imgDeleteInFirebase);

        return res.json(deleteProject);

    }
}

module.exports = {DeleteProjectController}