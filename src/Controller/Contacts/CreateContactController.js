const prisma = require('../../prisma');

class CreateContactController{
    async execute (req, res){
        const {Plataform, Direction, TypePhone,} = req.body;

        if (!Plataform || !Direction){
            throw new Error("Send all fields.")
        }

        const existOther = await prisma.contacts.findFirst({
            where:{
                Plataform:Plataform
            }
        });

        if (existOther){
            throw new Error("This platform already exists.")
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