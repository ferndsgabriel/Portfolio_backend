const prisma = require('../../prisma');

class CreateContactController{
    async execute (req, res){
        const {Plataform, Direction, TypePhone,} = req.body;

        if (!Plataform || !Direction){
            throw new Error('Envie todos os dados!');
        }

        const existOther = await prisma.contacts.findFirst({
            where:{
                Plataform:Plataform
            }
        });

        if (existOther){
            throw new Error ('Está plataforma já existe.');
        }


        const updateContact = await prisma.contacts.create({
            data:{
                Plataform:Plataform,
                TypePhone:TypePhone,
                Direction:Direction
            }
        });
        
        return res.json(updateContact);
    }
}

module.exports = {CreateContactController};