import User, {IUser} from '../models/User';
import {Response, Request} from 'express';
import bcrypt from 'bcryptjs'

export class UsersController {
    async addUser(req: Request, res: Response) {
        try {
            const {
                firstName,
                lastName,
                email,
                password
            } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                                         firstName,
                                         lastName,
                                         email,
                                         password: hashedPassword,
                                         role: 'user'
                                     });

            const maxIndexUser = await User.findOne().sort('-index').lean().exec();
            console.log('Результат запроса на получение максимального индекса:', maxIndexUser);

            if (!maxIndexUser) {
                console.log('Пользователи не найдены, устанавливаем индекс в 1');
                newUser.index = 1;
            } else {
                newUser.index = (maxIndexUser.index || 0) + 1;
            }

            console.log('Конечный индекс:', newUser.index);

            await newUser.save();

            return res.status(201).json({
                                            message: 'Пользователь успешно добавлен.',
                                            user: newUser
                                        });
        } catch (error) {
            console.error('Ошибка при добавлении пользователя:', error);

            if ((error as any).code === 11000) {
                return res.status(409).json({message: 'Пользователь с таким email уже существует.'});
            }

            return res.status(500).json({message: 'Ошибка при добавлении пользователя.'});
        }
    }


    async deleteUser(index: number, req: Request, res: Response) {

        try {
            const deletedUser = await User.findOneAndDelete({index});
            if (!deletedUser) {
                console.log('Пользователь не найден.');
                return res.status(404).json({message: 'Пользователь не найден.'});
            } else {
                console.log('Пользователь удален:', {deletedUser});
                return res.status(200).json({
                                                message: 'Пользователь удален',
                                                deletedUser
                                            });
            }
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
            return res.status(500).json({message: 'Ошибка при удалении пользователя.'});
        }
    }

    async updateUser(index: number, updateData: Partial<IUser>, res: Response) {
        try {
            const updatedUser = await User.findOneAndUpdate({index}, updateData, {new: true});
            if (!updatedUser) {
                console.log('Пользователь не найден.');
                return res.status(404).json({message: 'Пользователь не найден.'});
            } else {
                console.log('Пользователь обновлен:', {updatedUser});
                return res.status(200).json({
                                                message: 'Пользователь обновлен:',
                                                updatedUser
                                            });
            }
        } catch (error) {
            console.error('Ошибка при обновлении пользователя:', error);
            return res.status(500).json({message: 'Ошибка при обновлении пользователя.'});
        }
    }

    async getUser(index: number, res: Response) {
        try {
            const user = await User.findOne({index});
            if (!user) {
                console.log('Пользователь не найден.');
                return res.status(404).json({message: 'Пользователь не найден.'});
            } else {
                console.log('Пользователь получен:', user);
                return res.status(200).json({
                                                message: 'Пользователь получен:',
                                                user
                                            });
            }
        } catch (error) {
            console.error('Ошибка при получении пользователя:', error);
            return res.status(500).json({message: 'Ошибка при получении пользователя.'});
        }
    }

    async getAllUsers(res: Response) {
        try {
            const allUsers = await User.find();
            if (allUsers.length === 0) {
                console.log('Пользователей не найдено.');
                return res.status(404).json({message: 'Пользователей не найдено.'});
            } else {
                console.log('Пользователи получены:', allUsers.length);
                return res.status(200).json({
                                                message: 'Пользователи получены:',
                                                users: allUsers
                                            });
            }
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
            return res.status(500).json({message: 'Ошибка при получении пользователей.'});
        }
    }
}

export const usersController = new UsersController();