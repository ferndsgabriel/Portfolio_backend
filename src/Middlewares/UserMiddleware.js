const { verify } = require('jsonwebtoken');

async function UserMiddleware(req, res, next){
    const token = req.headers.authorization;

    if (!token){
        return res.status(401).end();
    }
    
    const [bearer, getToken] = token.split(' ');

    try {
        const decodedToken = verify(getToken, process.env.JWT_SECRET);
        next();
    } catch(err) {
        return res.status(401).json({ error: 'Token inválido' });
    }
}

module.exports = {UserMiddleware};
