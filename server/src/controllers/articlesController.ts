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
