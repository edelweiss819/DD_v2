import User, {IUser} from '../models/User';
import {Response, Request} from 'express';
import bcrypt from 'bcryptjs';
import jwt, {JwtPayload} from 'jsonwebtoken';
import Article from '../models/Article';
import dotenv from 'dotenv';

export interface DecodedToken extends JwtPayload {
    index: number;
}

dotenv.config();

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
                                         role: 'user',
                                         registrationDate: Math.floor(Date.now() / 1000),
                                         avatar: 'defaultAvatar'
                                     });

            const maxIndexUser = await User.findOne().sort('-index').lean().exec();
            console.log('Результат запроса на получение максимального индекса:', maxIndexUser);

            newUser.index = maxIndexUser ? (maxIndexUser.index || 0) + 1 : 1;
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
                return res.status(404).json({message: 'Пользователь не найден.'});
            }

            return res.status(200).json({
                                            message: 'Пользователь удален',
                                            deletedUser
                                        });
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
            return res.status(500).json({message: 'Ошибка при удалении пользователя.'});
        }
    }

    async updateUser(index: number, updateData: Partial<IUser>, res: Response) {
        try {
            const updatedUser = await User.findOneAndUpdate({index}, updateData, {new: true});
            if (!updatedUser) {
                return res.status(404).json({message: 'Пользователь не найден.'});
            }

            return res.status(200).json({
                                            message: 'Пользователь обновлен:',
                                            updatedUser
                                        });
        } catch (error) {
            console.error('Ошибка при обновлении пользователя:', error);
            return res.status(500).json({message: 'Ошибка при обновлении пользователя.'});
        }
    }

    async getUser(req: Request, res: Response) {
        console.log('Получен запрос на получение пользователя.');

        const token = req.headers.authorization?.split(' ')[1];
        const userRequestIndex = Number(req.headers['user-index']);
        console.log(`Индекс запрашиваемого пользователя: ${userRequestIndex}`);
        const userFields = req.headers['user-fields'] as string;


        if (!token) {
            console.warn('Ошибка авторизации: отсутствует токен.');
            return res.status(401).json({message: 'Токен обязателен.'});
        }

        if (isNaN(userRequestIndex)) {
            console.warn('Передано некорректное значение для индекса пользователя.');
            return res.status(400).json({message: 'Некорректный индекс пользователя.'});
        }

        try {
            const decoded: any = jwt.verify(token!, process.env.JWT_SECRET as string);
            console.log('Токен успешно декодирован:', decoded);

            const userRole = decoded.role;
            const userIndex = Number(decoded.index);

            let user;

            if (userIndex) {
                user = await User.findOne({index: userRequestIndex});
                console.log(`Пользователь по индексу ${userRequestIndex} найден.`);
            } else if (userRole === 'admin' && !userRequestIndex) {
                user = await User.findOne({index: userRequestIndex});
                console.log(`Пользователь с индексом ${userRequestIndex} найден (Администратор).`);
            }


            if (!user) {
                console.warn(`Пользователь с индексом ${userRequestIndex} не найден.`);
                return res.status(404).json({message: 'Пользователь не найден.'});
            }

            if (!userFields) {
                console.warn('Ошибка: user-fields не передан в заголовках.');
                return res.status(400).json({message: 'Отсутствуют данные пользователя.'});
            }

            const splitedData = userFields.split(',');
            console.log(`Запрошенные поля пользователя с индексом ${userRequestIndex}:`, splitedData);

            const protectedFields = [
                'password',
                'email',
                'lastArticles'
            ];
            const resFields: any = {};

            for (const field of splitedData) {
                const trimmedField = field.trim() as keyof IUser;

                if (protectedFields.includes(trimmedField) && (userRole !== 'admin' && userIndex !== userRequestIndex)) {
                    console.warn(`Пользователь ${userIndex} не имеет доступа к полю: ${trimmedField} пользователя ${userRequestIndex}`);
                    continue;
                }

                if (trimmedField in user) {
                    resFields[trimmedField] = user[trimmedField];
                }
            }

            return res.status(200).json({
                                            message: 'Данные пользователя:',
                                            user: resFields,
                                        });

        } catch (error) {
            console.error('Ошибка при получении пользователя:', error);
            return res.status(500).json({message: 'Ошибка при получении пользователя.'});
        }
    }


    async getAllUsers(res: Response) {
        try {
            const allUsers = await User.find();
            if (allUsers.length === 0) {
                return res.status(404).json({message: 'Пользователей не найдено.'});
            }

            return res.status(200).json({
                                            message: 'Пользователи получены:',
                                            users: allUsers
                                        });
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
            return res.status(500).json({message: 'Ошибка при получении пользователей.'});
        }
    }

    async getUserFavoriteArticlesList(req: Request, res: Response) {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({message: 'Токен обязателен.'});
        }

        try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

            const userRole = decoded.role;
            const userIndex = Number(decoded.index);


            const user = await User.findOne({index: userIndex});


            if (!user) {
                return res.status(404).json({message: 'Пользователь не найден.'});
            }

            const userFavArticlesList = user.favoriteArticles;

            if (userIndex === user.index || userRole === 'admin') {
                return res.status(200).json({
                                                message: `Любимые статьи пользователя номер ${userIndex}`,
                                                favoriteArticles: userFavArticlesList
                                            });
            } else {
                console.log('Ошибка: Недостаточно прав.');
                return res.status(403).json({message: 'Недостаточно прав'});
            }

        } catch (err) {
            console.error('Ошибка в обработке запроса:', err);
            return res.status(500).json({message: 'Ошибка сервера.'});
        }
    }


    async toggleArticleFavStatus(req: Request, res: Response) {
        const {
            index,
            token
        } = req.body;

        if (!token) {
            return res.status(401).json({message: 'Токен обязателен.'});
        }

        try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
            const userIndex = decoded.index;

            const user = await User.findOne({index: userIndex});
            if (!user) {
                return res.status(404).json({message: 'Пользователь не найден.'});
            }

            const article = await Article.findOne({index});
            if (!article) {
                return res.status(404).json({message: 'Статья не найдена.'});
            }

            const {title} = article;
            const favoriteArticle = user.favoriteArticles.find(fav => fav.index === index);

            if (favoriteArticle) {
                user.favoriteArticles = user.favoriteArticles.filter(fav => fav.index !== index);
                await user.save();

                return res.status(200).json({
                                                message: 'Статья удалена из избранного.',
                                                favoriteArticles: user.favoriteArticles,
                                            });
            } else {

                user.favoriteArticles.push({
                                               index,
                                               title
                                           });
                await user.save();

                return res.status(200).json({
                                                message: 'Статья добавлена в избранное.',
                                                favoriteArticles: user.favoriteArticles,
                                            });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({message: 'Ошибка сервера.'});
        }
    }


    async addArticleToLastArticlesList(req: Request, res: Response) {
        const token = req.headers.authorization?.split(' ')[1];
        const articleIndex = req.body.articleIndex;

        if (!token) {
            return res.status(401).json({message: 'Токен обязателен.'});
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
            const userIndex = Number(decoded.index);
            const user = await User.findOne({index: userIndex});

            if (!user) {
                return res.status(404).json({message: 'Пользователь не найден.'});
            }

            const article = await Article.findOne({index: articleIndex});
            if (!article) {
                return res.status(404).json({message: 'Статья не найдена.'});
            }

            user.lastArticles = user.lastArticles.filter((article) => article.index !== articleIndex);
            user.lastArticles.push({
                                       index: article.index,
                                       title: article.title,
                                       timestamp: Math.floor(Date.now() / 1000)
                                   });

            await user.save();

            return res.status(200).json({
                                            message: 'Последняя статья обновлена.',
                                            lastArticles: user.lastArticles.sort((a,
                                                                                  b) => a.timestamp - b.timestamp),
                                        });

        } catch (err) {
            console.error(err);
            return res.status(500).json({message: 'Ошибка сервера.'});
        }
    }

    async getUserLastArticlesList(req: Request, res: Response) {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({message: 'Токен обязателен.'});
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
            const userIndex = Number(decoded.index);
            const user = await User.findOne({index: userIndex});

            if (!user) {
                return res.status(404).json({message: 'Пользователь не найден.'});
            }


            return res.status(200).json({
                                            message: `Список последних статей пользователя ${userIndex}.`,
                                            lastArticles: user.lastArticles

                                        });

        } catch (err) {
            console.error(err);
            return res.status(500).json({message: 'Ошибка сервера.'});
        }
    }

    async getUserAvatar(req: Request, res: Response) {
        try {
            const userIndex = Number(req.query.index);


            if (!userIndex) {
                return res.status(400).json({message: 'Индекс автора обязателен.'});
            }


            const user = await User.findOne({index: userIndex});

            if (!user) {
                return res.status(404).json({message: 'Автор по индексу не найден.'});
            }


            const avatarUrl = user.avatar;

            return res.status(200).json({
                                            userIndex,
                                            avatarUrl,
                                        });

        } catch (err) {
            console.error(err);
            return res.status(500).json({message: 'Ошибка сервера.'});
        }

    }
}


export const usersController = new UsersController();
