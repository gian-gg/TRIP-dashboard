import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all for React Router routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = 52504;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
