const prisma = require("../../prisma");

class DeleteContactController{
    async execute(req, res){
        const {Plataform} = req.body;

        if (!Plataform){
            throw new Error('Digite a plataforma');
        }

        const exist = await prisma.contacts.findFirst({
            where:{
                Plataform:Plataform
            }
        });

        if (!exist){
            throw new Error ('Plataforma não encontrada.');
        }
        
        const deleteContact = await prisma.contacts.delete({
            where:{
                Plataform:Plataform
            }
        });

        return res.json(deleteContact);
    }
}

module.exports = {DeleteContactController};