import express from 'express';
import path from 'path';
import { dirname } from 'path';

const app = express();
const port = 3245;
const __dirname = import.meta.dirname;
const clientDir = path.join(__dirname, '..', 'client');

app.get('/', (req, res) => {
    res.sendFile(path.join(clientDir, 'index.html'));
})

app.listen(port, () => console.log(`Starting server on port ${port}`));