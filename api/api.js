
import express from "express";
const app = express();
const port = 5010;
import cors from 'cors';

app.use(cors());

app.get('/api/numbers', (req, res) => {
  const numbers = Array.from({ length: 4
   }, (_, i) => i + 1);
  res.json(numbers);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`); 
});
