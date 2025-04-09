import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const app = express();
const port = 4000;

const __dirname = import.meta.dirname;

app.use(cors({
    origin: 'http://localhost:6279', 
    credentials: true,
    exposedHeaders: ['set-cookie']
}));

app.get('/api/', (req, res) => {
    res.send('what up');
});

app.listen(4000, () => console.log(`Starting server on port ${port}`));