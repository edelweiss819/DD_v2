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

//Обновления статей по жанрам

export const updateGenresCount = async (shouldUpdate: boolean): Promise<IMetadata | null> => {
    if (shouldUpdate) {
        try {
            // Получаем все статьи
            const articles = await Article.find();

            // Объект для хранения количества статей по жанрам
            const genreCounts: Record<string, number> = {};

            // Обход всех статей
            articles.forEach(article => {
                // Получаем жанры статьи
                const genres = article.genres; // Предполагаем, что `genres` - это массив строк

                // Обход всех жанров и обновление счетчика
                genres.forEach(genre => {
                    if (genreCounts[genre]) {
                        genreCounts[genre] += 1;
                    } else {
                        genreCounts[genre] = 1;
                    }
                });
            });

            // Обновляем метаданные с количеством статей по жанрам
            const metadata = await Metadata.findOneAndUpdate(
                {},
                {$set: {'metadata.genresCount': genreCounts}},
                {
                    upsert: true,
                    new: true
                }
            );

            console.log('Количество статей по жанрам обновлено:', genreCounts);
            return metadata;

        } catch (error) {
            console.error('Error updating genres count:', error);
            return null;
        }
    } else {
        console.log('Update not required');
        return null;
    }
};
//Получение количества статей по жанру
export const getArticlesTotalCountByGenre = async (req: Request,
                                                   res: Response): Promise<void> => {


    try {
        const genre = decodeURIComponent(req.params.genre as string);

        console.log('Fetching metadata for total articles count by genre...');

        // Получаем метаданные
        const metadata = await Metadata.findOne();

        // Извлекаем количество статей
        const totalArticlesCountByGenre = metadata?.metadata.genresCount[`${genre}`] ?? null;
        console.log(`Total articles count by "${genre}":`, totalArticlesCountByGenre);

        // Возвращаем результат в формате JSON, только значение
        if (totalArticlesCountByGenre !== null) {
            res.status(200).json(totalArticlesCountByGenre);
        } else {
            res.status(404).json({error: `Total articles by ${genre} count not found`});
        }
    } catch (error) {
        console.error(`Error fetching total articles count by this genre :`, error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};