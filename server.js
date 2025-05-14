const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const FILE_PATH = './musicas.json';

function readMusicas() {
  if (!fs.existsSync(FILE_PATH)) fs.writeFileSync(FILE_PATH, '[]');
  return JSON.parse(fs.readFileSync(FILE_PATH));
}

function writeMusicas(musicas) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(musicas, null, 2));
}

app.get('/musicas', (req, res) => {
  res.json(readMusicas());
});

app.post('/musicas', (req, res) => {
  const musicas = readMusicas();
  const { nome, autor, cantor, tom } = req.body;

  if (!nome || !autor || !cantor || !tom) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  const novaMusica = {
    id: Date.now(),
    nome,
    autor,
    cantor,
    tom
  };

  musicas.push(novaMusica);
  writeMusicas(musicas);
  res.status(201).json(novaMusica);
});

app.delete('/musicas/:id', (req, res) => {
  let musicas = readMusicas();
  musicas = musicas.filter((m) => m.id != req.params.id);
  writeMusicas(musicas);
  res.status(204).send();
});

app.get('/musicas', (req, res) => {
  const searchQuery = req.query.search?.toLowerCase() || '';
  const tasks = readTasks();

  const filteredMusics = tasks.filter((m) =>
    m.nome.toLowerCase().includes(searchQuery) ||
    m.autor.toLowerCase().includes(searchQuery) ||
    m.cantor.toLowerCase().includes(searchQuery) ||
    m.tom.toLowerCase().includes(searchQuery)
  );

  res.json(filteredMusics);
});

app.get('/musicas', (req, res) => {
  const searchQuery = req.query.search?.toLowerCase() || '';
  const tasks = readTasks();

  const filteredMusics = tasks.filter((m) =>
    m.nome.toLowerCase().includes(searchQuery) ||
    m.autor.toLowerCase().includes(searchQuery) ||
    m.cantor.toLowerCase().includes(searchQuery) ||
    m.tom.toLowerCase().includes(searchQuery)
  );

  res.json(filteredMusics);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
