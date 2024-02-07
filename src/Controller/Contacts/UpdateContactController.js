const prisma = require("../../prisma");

class UpdateContactController{
    async execute(req, res){
        const {Plataform, Direction, TypePhone} = req.body;

        if (!Plataform || !Direction){
            throw new Error('Digite todos os campos');
        }

        const exist = await prisma.contacts.findFirst({
            where:{
                Plataform:Plataform
            }
        });

        if (!exist){
            throw new Error ('Plataforma não encontrada.');
        }
        
        const updateContact = await prisma.contacts.update({
            where:{
                Plataform:Plataform
            },data:{
                Direction:Direction,   
                TypePhone:TypePhone
                
            }
        });

        return res.json(updateContact);
    }
}

module.exports = {UpdateContactController};