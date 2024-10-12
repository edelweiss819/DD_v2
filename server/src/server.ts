import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 10000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Сервер запущен!');
});

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log('Connected to the database');

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    } catch (err) {
        console.error('Error starting the server:', err);
    }
};

startServer();
