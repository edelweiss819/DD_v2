import {Request, Response} from 'express';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User';
import dotenv from 'dotenv'

dotenv.config();

export class AuthController {
    async login(req: Request, res: Response) {
        try {
            const {
                email,
                password
            } = req.body;
            const user = await User.findOne({email});
            if (!user) {
                console.log('Пользователь не найден.')
                return res.status(400).json({message: `Пользователь  ${email} не найден.`})
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.log('Неверный пароль.')
                return res.status(401).json({message: 'Неверный пароль.'})
            }

            const token = jwt.sign({
                                       index: user.index,
                                       role: user.role
                                   }, process.env.JWT_SECRET!, {expiresIn: '5h'});
            return res.status(200).json({token})

        } catch (error) {
            console.error('Ошибка при входе пользователя:', error);
            return res.status(500).json({message: 'Ошибка при входе'});
        }
    }

}

export const authController = new AuthController();