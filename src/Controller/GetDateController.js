const prisma = require('../prisma');

class GetDateController{
    async execute(req, res){
        const about = await prisma.about.findFirst();
        const contacts = await prisma.contacts.findMany();
        const skills = await prisma.skills.findMany();
        const projects = await prisma.projects.findMany();

        return res.json({About:about, Contacts:contacts, Skills:skills, Projects:projects });
    }
}
module.exports = {GetDateController};