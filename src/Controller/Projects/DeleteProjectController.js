const prisma = require("../../prisma");
const  {DeletePhoto} = require("../../Middlewares/FirebaseStorageMiddleware");

class DeleteProjectController{
    async execute(req, res){
        const { Id } = req.body;

        if (!Id){
            throw new Error ("Digite o Id.");
        }

        const exist = await prisma.projects.findFirst({
            where:{
                Id:Id
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
                Id:Id
            }
        });
        DeletePhoto(imgDeleteInFirebase);

        return res.json(deleteProject);

    }
}

module.exports = {DeleteProjectController}