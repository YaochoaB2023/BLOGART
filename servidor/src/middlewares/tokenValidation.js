import Jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const requireAuth = (req, res, nnext) => {

    const { token } = req.cookies;
    if(!token)
    return res.status(401).json({ message : "no token, autorizacion denegada" });

    Jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if(err) res.status(403).json({ message : "invalid token" });

        req.user = user;
        nnext();
    })

}
