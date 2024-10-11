import {Request, Response} from 'express';
import Article from '../models/Article';
import dotenv from 'dotenv';
import Metadata from '../models/Metadata';

dotenv.config();


export const getAllArticles = async (req: Request,
                                     res: Response): Promise<Response> => {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    try {
        const articles = await Article.find()
            .skip((page - 1) * limit)
            .limit(limit);

        return res.status(200).json(articles);
    } catch (error) {
        const errorMessage = (error as Error).message;
        return res.status(500).json({message: errorMessage});
    }
};

export const getArticleByIndex = async (req: Request,
                                        res: Response): Promise<Response> => {
    const {index} = req.params;

    try {

        const article = await Article.findOne({index});

        if (!article) {
            return res.status(404).json({message: 'Article not found'});
        }

        return res.status(200).json(article);
    } catch (error) {
        const errorMessage = (error as Error).message;
        return res.status(500).json({message: errorMessage});
    }
};


export const getArticlesListByGenre = async (req: Request,
                                             res: Response): Promise<Response> => {
    const genre = decodeURIComponent(req.params.genre as string);
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    if (!genre) {
        return res.status(400).json({message: 'Genre parameter is required'});
    }

    console.log('Поиск по жанру:', genre);

    try {
        const query = {
            genres: genre
        };


        const skip = (page - 1) * limit;


        const articlesQuery = Article.find(query)
            .sort({index: 1})
            .skip(skip)
            .limit(limit)
            .lean();


        const filteredArticlesByGenre = await articlesQuery.exec();

        if (filteredArticlesByGenre.length > 0) {
            return res.status(200).json(filteredArticlesByGenre);
        } else {
            return res.status(404).json({message: 'No articles found for this genre'});
        }
    } catch (error) {
        console.error('Error fetching filtered articles:', error);
        const errorMessage = (error as Error).message;
        return res.status(500).json({message: errorMessage});
    }
};


//Поиск по жанру и тексту

export const getArticlesByGenreAndWords = async (req: Request,
                                                 res: Response): Promise<Response> => {
    const genres = req.query.genres as string | undefined;
    const limit = parseInt(req.query.limit as string) || 10;
    const cursor = parseInt(req.query.lastCursor as string) || 0;
    const searchWords = (req.query.s as string) || '';
    const words = searchWords.trim().split(' ').filter(Boolean);
    const sortOrder = parseInt(req.query.sortOrder as string) || 1;

    try {
        let articles: any[] = [];

        // 1. Если указаны только жанры
        if (genres && words.length === 0) {
            const singleGenres = genres.split(',');
            console.log('Поиск по массиву жанров:', singleGenres);
            const genreQuery: any = {
                genres: {$all: singleGenres}
            };
            genreQuery.index = sortOrder === 1 ? {$gt: cursor} : {$lte: cursor};

            articles = await Article.find(genreQuery)
                .sort({index: 1})
                .limit(limit)
                .lean();

            if (articles.length > 0) {
                console.log(`Найдено ${articles.length} статей по жанрам.`);
                return res.status(200).json({
                                                articles,
                                                cursor: articles[articles.length - 1].index
                                            });
            } else {
                console.log(`Статьи с набором жанров ${singleGenres} не найдены.`);
                return res.status(404).json({message: 'Статьи по заданным жанрам не найдены.'});
            }
        }

        // 2. Если указаны только слова
        if (words.length > 0 && !genres) {
            const searchQuery = {
                $or: [
                    {
                        title: {
                            $regex: words.join('|'),
                            $options: 'i'
                        }
                    },
                    {
                        content: {
                            $regex: words.join('|'),
                            $options: 'i'
                        }
                    }
                ],
                index: sortOrder === 1 ? {$gt: cursor} : {$lte: cursor}
            };

            articles = await Article.find(searchQuery)
                .sort({index: 1})
                .limit(limit)
                .lean();

            if (articles.length > 0) {
                console.log(`Найдено ${articles.length} статей по запросу.`);
                return res.status(200).json({
                                                articles,
                                                cursor: articles[articles.length - 1].index
                                            });
            } else {
                console.log('Статьи не найдены по указанным словам.');
                return res.status(404).json({message: 'Статьи по заданным словам не найдены.'});
            }
        }

        // 3. Если указаны как жанры, так и слова
        if (genres && words.length > 0) {
            const singleGenres = genres.split(',');
            console.log('Поиск по массиву жанров и словам:', singleGenres);
            const genreQuery: any = {
                genres: {$all: singleGenres}
            };
            const wordQuery = {
                $or: [
                    {
                        title: {
                            $regex: words.join('|'),
                            $options: 'i'
                        }
                    },
                    {
                        content: {
                            $regex: words.join('|'),
                            $options: 'i'
                        }
                    }
                ]
            };

            const searchQuery = {
                $and: [
                    genreQuery,
                    wordQuery
                ],
                index: sortOrder === 1 ? {$gt: cursor} : {$lte: cursor}
            };

            articles = await Article.find(searchQuery)
                .sort({index: 1})
                .limit(limit)
                .lean();

            if (articles.length > 0) {
                console.log(`Найдено ${articles.length} статей по жанрам и словам.`);
                return res.status(200).json({
                                                articles,
                                                cursor: articles[articles.length - 1].index
                                            });
            } else {
                console.log(`Статьи с набором жанров ${singleGenres} и словами ${words.join(', ')} не найдены.`);
                return res.status(404).json({message: 'Статьи по заданным жанрам и словам не найдены.'});
            }
        }

        // Если ни жанров, ни слов не указано
        return res.status(400).json({message: 'Не указаны жанры или слова для поиска.'});

    } catch (error) {
        console.error('Ошибка при получении статей:', error);
        const errorMessage = (error as Error).message;
        return res.status(500).json({message: errorMessage});
    }
};


// Всего статей в поиске
export const getTotalArticlesCountByGenresAndWords = async (req: Request,
                                                            res: Response): Promise<Response> => {
    const genres = req.query.genres as string | undefined;
    const searchWords = (req.query.s as string) || '';
    const words = searchWords.trim().split(' ').filter(Boolean);
    let query: any = {};

    if (genres) {
        const singleGenres = genres.split(',');
        query = {genres: {$all: singleGenres}};
    }

    if (words.length > 0) {
        query = {
            ...query,
            $or: [
                {
                    title: {
                        $regex: words.join('|'),
                        $options: 'i'
                    }
                },
                {
                    content: {
                        $regex: words.join('|'),
                        $options: 'i'
                    }
                }
            ]
        };
    }

    try {
        const total = await Article.countDocuments(query).lean();
        console.log('Всего статей параметрам запроса:', total)
        return res.status(200).json(total);
    } catch (error) {
        console.error('Ошибка при получении общего количества статей:', error);
        const errorMessage = (error as Error).message;
        return res.status(500).json({message: errorMessage});
    }
};

export const getRandomArticlesList = async (req: Request, res: Response) => {
    try {
        const metadata = await Metadata.findOne();
        const totalArticlesInDb = metadata?.metadata?.totalArticlesCount;


        const maxArticles = Math.min(10, totalArticlesInDb || 0);
        const articlesIndexesSet = new Set<number>();

        while (articlesIndexesSet.size < maxArticles) {
            const randomIndex = Math.floor(Math.random() * totalArticlesInDb);
            articlesIndexesSet.add(randomIndex);

            if (articlesIndexesSet.size >= totalArticlesInDb) {
                break;
            }
        }

        const articlesIndexesArray = Array.from(articlesIndexesSet);
        console.log('Массив индексов случайных статей: ', articlesIndexesArray);

        const randomArticlesList: Array<{ index: number; title: string }> = [];


        for (const articleIndex of articlesIndexesArray) {
            const article = await Article.findOne({index: articleIndex});

            if (article) {
                randomArticlesList.push({
                                            index: article.index,
                                            title: article.title,
                                        });
            }

            if (randomArticlesList.length >= maxArticles) {
                break;
            }
        }

        return res.status(200).json({
                                        message: 'Список случайных статей',
                                        count: randomArticlesList.length,
                                        randomArticlesList
                                    });
    } catch (error) {
        console.error('Ошибка при получении общего количества статей:', error);
        const errorMessage = (error as Error).message;
        return res.status(500).json({message: errorMessage});
    }
};
