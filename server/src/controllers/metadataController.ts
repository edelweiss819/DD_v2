import Metadata, {IMetadata} from '../models/Metadata';
import Article from '../models/Article';
import {Request, Response} from 'express';

// Получение данных метаданных
export const getMetadata = async (): Promise<IMetadata | null> => {
    try {
        const metadata = await Metadata.findOne();
        return metadata;
    } catch (error) {
        console.error('Error fetching metadata:', error);
        return null;
    }
};

// Получение количества статей


export const getArticlesTotalCount = async (req: Request,
                                            res: Response): Promise<void> => {
    try {
        console.log('Fetching metadata for total articles count...');

        // Получаем метаданные
        const metadata = await Metadata.findOne();
        console.log('Fetched metadata:', metadata);

        // Извлекаем количество статей
        const totalArticlesCount = metadata?.metadata['totalArticlesCount'] ?? null;
        console.log('Total articles count:', totalArticlesCount);

        // Возвращаем результат в формате JSON, только значение
        if (totalArticlesCount !== null) {
            res.status(200).json(totalArticlesCount);
        } else {
            res.status(404).json({error: 'Total articles count not found'});
        }
    } catch (error) {
        console.error('Error fetching total articles count:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};


// Обновление количества статей
export const updateTotalArticlesCount = async (shouldUpdate: boolean): Promise<IMetadata | null> => {
    if (shouldUpdate) {
        try {
            const totalArticlesCount = await Article.countDocuments();
            const timestamp = new Date().getTime();

            const metadata = await Metadata.findOneAndUpdate(
                {},
                {
                    $set: {
                        'metadata.totalArticlesCount': totalArticlesCount,
                        'metadata.lastUpdated': timestamp
                    }
                },
                {
                    upsert: true,
                    new: true
                }
            );
            console.log('Количество статей обновлено. Всего статей в базе:', totalArticlesCount);
            return metadata;
        } catch (error) {
            console.error('Error updating articles:', error);
            return null;
        }
    } else {
        return null;
    }
};
