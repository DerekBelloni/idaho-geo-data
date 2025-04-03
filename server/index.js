import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const app = express();
const port = 4000;

const __dirname = import.meta.dirname;
const d3Dir = path.join(__dirname, '..', 'node_modules', 'd3', 'dist');

const d3FilePath = path.join(d3Dir, 'd3.js');
if (fs.existsSync(d3FilePath)) {
  console.log('d3.js file exists at:', d3FilePath);
} else {
  console.log('d3.js file NOT found at:', d3FilePath);
}

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
    // exposedHeaders: ['set-cookie']
}));

// Serve static file from the client folder
// app.use(express.static(clientDir));

// Serve D3 from node_modules/d3/dist
// app.use('/d3', express.static(d3Dir));

app.get('/api/', (req, res) => {
    console.log('req: ', req)
    res.send('what up');
});

app.listen(4000, () => console.log(`Starting server on port ${port}`));