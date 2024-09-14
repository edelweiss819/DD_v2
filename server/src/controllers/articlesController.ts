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

export interface Query {
    index?: { $gt: number };

    [key: string]: any;
}

export const getFilteredArticlesList = async (req: Request,
                                              res: Response): Promise<Response> => {
    const searchParams = req.query.p as string;
    const limit = 3;
    const lastIndex = parseInt(req.query.lastIndex as string) || undefined;

    if (!searchParams) {
        return res.status(400).json({message: 'Search parameter is required'});
    }

    try {
        //regex для того, чтобы параметры в кавычках передавались как один
        const regex = /"[^"]*"|\S+/g;
        const cutSearchParams: string[] = (searchParams.match(regex) || [])
            .map(param => param.replace(/"/g, '').replace(/\+/g, ' ').trim());

        console.log('Параметры поиска:', cutSearchParams);
        const conditions = cutSearchParams.map(param => ({
            $or: [
                {
                    title: {
                        $regex: param,
                        $options: 'i'
                    }
                },
                {
                    content: {
                        $regex: param,
                        $options: 'i'
                    }
                }
            ]
        }));

        const query: Query = {$and: conditions};
        if (lastIndex !== undefined) {
            query['index'] = {$gt: lastIndex};
        }

        const filteredArticles = await Article.find(query)
            .sort({index: 1})
            .limit(limit)
            .lean();

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

export const getArticlesByGenre = async (req: Request,
                                         res: Response): Promise<Response> => {
    const searchParams = req.query.g as string;
    const limit = 5;
    const lastIndex = parseInt(req.query.lastIndex as string) || undefined;

    if (!searchParams) {
        return res.status(400).json({message: 'Search parameter is required'});
    }

    console.log('Параметр поиска по жанру:', searchParams);

    try {
        const query = {
            $text: {$search: searchParams}
        };


        const articlesQuery = Article.find(query).sort({index: 1}).limit(limit).lean();

        if (lastIndex) {
            articlesQuery.skip(lastIndex);
        }

        const filteredArticlesByGenre = await articlesQuery.exec();

        if (filteredArticlesByGenre.length > 0) {
            return res.status(200).json(filteredArticlesByGenre);
        } else {
            return res.status(404).json({message: 'No articles found'});
        }
    } catch (error) {
        console.error('Error fetching filtered articles:', error);
        const errorMessage = (error as Error).message;
        return res.status(500).json({message: errorMessage});
    }
};
