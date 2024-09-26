import {Request, Response, NextFunction} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

// Middleware для аутентификации токена и проверки роли
export const authenticateToken = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.sendStatus(401); // Unauthorized

        jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
            if (err) return res.sendStatus(403); // Forbidden

            if (user && typeof user !== 'string' && allowedRoles.includes(user.role)) {
                req.user = user;
                next();
            } else {
                return res.sendStatus(403); // Forbidden
            }
        });
    };
};