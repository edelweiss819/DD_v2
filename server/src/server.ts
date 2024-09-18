import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import articlesRouter from './routes/articlesRouter';
import metadataRouter from './routes/metadataRouter';
import {
    updateGenresCount,
    updateTotalArticlesCount
} from './controllers/metadataController';
import {UPDATE_GENRES_COUNT, UPDATE_TOTAL_ARTICLES} from './constants';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(articlesRouter);
app.use(metadataRouter);

const startServer = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/articles');
        console.log(`Connected to the database`);

        await updateTotalArticlesCount(UPDATE_TOTAL_ARTICLES);
        await updateGenresCount(UPDATE_GENRES_COUNT);

        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    } catch (err) {
        console.error('Error starting the server:', err);
    }
};

// Запускаем сервер
startServer();
