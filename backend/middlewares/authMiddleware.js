const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
dotenv.config();

const authMiddleware = async(req,res,next) =>{
    const myHeader = req.headers.authorization;
    
    if( !myHeader || !myHeader.startsWith("Bearer ") ){
        return res.status(403).send('header issue');
    }

    const token = myHeader.split(' ')[1];
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = decode.userId;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(500).send(err)
    }
}

module.exports = authMiddleware;