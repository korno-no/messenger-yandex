import express from 'express';
import path from 'path';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('dist'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}/`);
});
