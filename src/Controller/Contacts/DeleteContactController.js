const prisma = require("../../prisma");

class DeleteContactController{
    async execute(req, res){
        const {Id} = req.body;

        if (!Id){
            throw new Error("Enter the platform.")
        }

        const exist = await prisma.contacts.findFirst({
            where:{
                Id:Id
            }
        });

        if (!exist){
            throw new Error("Platform not found.")
        }
        
        const deleteContact = await prisma.contacts.delete({
            where:{
                Id:Id
            }
        });

        return res.json(deleteContact);
    }
}

module.exports = {DeleteContactController};