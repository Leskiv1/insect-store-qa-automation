import express from 'express';
import cors from 'cors';
import insectRouter from './router/routes.js';

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const logMessage = `${req.method} ${req.url} - Status: ${res.statusCode} - ${duration}ms`;

        console.log(logMessage);
    });
    next();
});

app.use('/api/insect/', insectRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});