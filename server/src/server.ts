import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import articlesRouter from './routes/articlesRouter';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(articlesRouter);

mongoose.connect('mongodb://localhost:27017/articles')
    .then(() => {
        console.log(`Connected to the database`);
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });
