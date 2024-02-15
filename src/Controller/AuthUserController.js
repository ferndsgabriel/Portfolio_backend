const {hash, compare} = require('bcryptjs');
const { sign } = require('jsonwebtoken');

class AuthUserController {
    async execute(req, res) { 
        const {pass} = req.body;

        if (!pass){
            throw new Error("Enter the password.")
        }

        const comparePass = await compare(pass, process.env.PASS);

        if (!comparePass){
            throw new Error("Invalid password.")
        }

        const token = sign({}, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
        
        return res.json({ token: token });
        

    }
}

module.exports = {AuthUserController};
