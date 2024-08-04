import {Request, Response} from 'express';
import Article from '../models/Article';

export const getAllArticles = async (req: Request, res: Response): Promise<Response> => {
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


export const getFilteredArticlesList = async (req: Request, res: Response): Promise<Response> => {
    const searchParams = req.query.p as string;
    const limit = 10;
    const page = parseInt(req.query.page as string) || 1;

    if (!searchParams) {
        return res.status(400).json({message: 'Search parameter is required'});
    }

    try {
        const cutSearchParams: string[] = searchParams.split('+').map(param => param.trim());
        const conditions = cutSearchParams.map(param => ({
            $or: [
                {title: {$regex: param, $options: 'i'}},
                {content: {$regex: param, $options: 'i'}}
            ]
        }));

        const filteredArticles = await Article.find({
            $and: conditions
        }).sort({_id: 1})
            .skip((page - 1) * limit)
            .limit(limit);

        if (filteredArticles.length > 0) {
            return res.status(200).json(filteredArticles);
        } else {
            return res.status(404).json({message: 'No articles found'});
        }
    } catch (error) {
        console.error('Error fetching filtered articles:', error);
        const errorMessage = (error as Error).message;
        return res.status(500).json({message: errorMessage});
    }
};

