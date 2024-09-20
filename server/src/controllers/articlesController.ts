import {Request, Response} from 'express';
import Article from '../models/Article';


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

        // Выполнение запроса
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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const searchWords = (req.query.s as string) || '';
    const words = searchWords.trim().split(' ').filter(Boolean);

    try {
        let articles: any[] = [];

        // Если указаны жанры
        if (genres) {
            const singleGenres = genres.split(',');
            console.log('Поиск по массиву жанров:', singleGenres);

            // Поиск по жанрам
            const genreQuery = {genres: {$all: singleGenres}};
            articles = await Article.find(genreQuery)
                .sort({index: 1})
                .skip(skip)
                .limit(limit)
                .lean();

            if (articles.length > 0) {
                console.log(`Найдено ${articles.length} статей по жанрам.`);
            } else if (searchWords.length > 0) {
                console.log(`Слова для полнотекстового поиска не обнаружены. Возвращаю найденные статьи по жанрам : ${singleGenres} `);
                return res.status(200).json(articles);

            } else {
                console.log(`Статьи с набором жанров ${singleGenres} не найдены.`);
                return res.status(404).json({message: 'Статьи по заданным жанрам не найдены.'});
            }
        }

        // Если жанры указаны, фильтруем статьи по словам внутри полученных данных
        if (articles.length > 0 && words.length > 0) {
            const wordRegex = words.map(word => new RegExp(word, 'i'));
            articles = articles.filter(article =>
                                           wordRegex.some(regex => regex.test(article.title) || regex.test(article.content))
            );
        } else if (words.length > 0) {
            // Если жанры не указаны, делаем полнотекстовый поиск по словам
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
                ]
            };

            articles = await Article.find(searchQuery)
                .sort({index: 1})
                .skip(skip)
                .limit(limit)
                .lean();
        }

        if (articles.length > 0) {
            console.log(`Найдено ${articles.length} статей по запросу.`);
            return res.status(200).json(articles);
        } else {
            console.log('Статьи не найдены.');
            return res.status(404).json({message: 'Статьи по заданным параметрам не найдены.'});
        }
    } catch (error) {
        console.error('Ошибка при получении статей:', error);
        const errorMessage = (error as Error).message;
        return res.status(500).json({message: errorMessage});
    }
};

