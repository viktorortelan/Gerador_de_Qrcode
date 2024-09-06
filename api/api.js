
import express from "express";
const app = express();
const port = 5010;
import cors from 'cors';

app.use(cors());

app.get('/api/numbers', (req, res) => {
  
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`); 
});
