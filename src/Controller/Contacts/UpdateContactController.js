const prisma = require("../../prisma");

class UpdateContactController{
    async execute(req, res){
        const {Plataform, Direction, TypePhone, Id} = req.body;

        if (!Plataform || !Direction || !Id) {
            throw new Error("Send all fields.")
        }

        const exist = await prisma.contacts.findFirst({
            where:{
                Id:Id
            }
        });

        if (!exist){
            throw new Error("Platform not found.")
        }
        
        const updateContact = await prisma.contacts.update({
            where:{
                Id:Id
            },data:{
                Direction:Direction,   
                TypePhone:TypePhone,
                Plataform:Plataform
                
            }
        });

        return res.json(updateContact);
    }
}

module.exports = {UpdateContactController};