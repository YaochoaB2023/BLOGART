import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export function createTokenAcces(payload){
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d" 
            },
            (err, Token) => {
                if(err) reject(err);
                resolve(Token)
            }
        )
    });
}