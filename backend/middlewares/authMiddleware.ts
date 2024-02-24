import  jwt from "jsonwebtoken";
import  * as dotenv from "dotenv";
import { Request,Response,NextFunction } from "express";
dotenv.config();

const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
  const myHeader = req.headers.authorization;

  if (!myHeader || !myHeader.startsWith("Bearer ")) {
    return res.status(403).send("header issue");
  }

  const token = myHeader.split(" ")[1];
  try {
    let decode = null;
    if(process.env.JWT_SECRET){
       decode = jwt.verify(token, process.env.JWT_SECRET);
    }
    // req.userId = decode?.userId;
    if(!decode){
      return res.sendStatus(403);
    }
    if(typeof decode === "string"){
      return res.sendStatus(403);
    }
    req.headers["userId"] = decode.userId;

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export default authMiddleware;
