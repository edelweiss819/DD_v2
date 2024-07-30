import {Request, Response} from 'express';
import Article from '../models/Article';

export const getAllArticles = async (req: Request, res: Response): Promise<Response> => {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    try {
        const articles = await Article.find()
            .skip((page - 1) * limit) // Пропуск статей для получения правильной страницы
            .limit(limit); // Ограничение количества статей, возвращаемых за один запрос

        return res.status(200).json(articles);
    } catch (error) {
        const errorMessage = (error as Error).message;
        return res.status(500).json({message: errorMessage});
    }
};

export const getArticleByIndex = async (req: Request, res: Response): Promise<Response> => {
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