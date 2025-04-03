import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 3245;
const __dirname = import.meta.dirname;

// const clientDir = path.join(__dirname, '..', 'client');
const d3Dir = path.join(__dirname, '..', 'node_modules', 'd3', 'dist');

console.log('d3Dir path:', d3Dir);

const d3FilePath = path.join(d3Dir, 'd3.js');
if (fs.existsSync(d3FilePath)) {
  console.log('d3.js file exists at:', d3FilePath);
} else {
  console.log('d3.js file NOT found at:', d3FilePath);
}


// Serve static file from the client folder
// app.use(express.static(clientDir));

// Serve D3 from node_modules/d3/dist
app.use('/d3', express.static(d3Dir));

app.get('/', (req, res) => {
    res.send(express.static(d3Dir));
})

// Optional: Log to confirm paths
// console.log('Serving client from:', clientDir);
console.log('Serving D3 from:', d3Dir);


app.listen(port, () => console.log(`Starting server on port ${port}`));