import jwt from 'jsonwebtoken';

import {TOKEN_SECRET} from '../config/key.token.js';

export default async function crearToken(playload) {
    return new Promise((resolve, reject) => {
        jwt.sign(playload, TOKEN_SECRET, { expiresIn: "15d" }, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
}