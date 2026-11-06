const express = require("express");

const app = express();

app.use(express.json());

let tarefas = [
  { id: 1, titulo: "tarefa 1" },
  { id: 2, titulo: "tarefa 2" },
];

app.get("/", (req, res) => {
  res.send("Olá, servidor!");
});

app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

app.get("/tarefas/:id", (req, res) => {
  const idURL = parseInt(req.params.id);
  if (Number.isNaN(idURL)) {
    return res.status(400).json({ mensagem: "O id tem de ser um número" });
  }
  const tarefa = tarefas.find((tarefaAtual) => tarefaAtual.id === idURL);
  if (tarefa === undefined) {
    return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  }
  res.json(tarefa);
});

app.post("/tarefas", (req, res) => {
  if (!req.body?.titulo) {
    return res.status(400).json({ mensagem: "Pedido mal feito" });
  }
  const novaTarefa = {};
  if (tarefas.length === 0){
    novaTarefa.id = 1;
  }
  else{
    const ultimoID = Math.max(...tarefas.map((tarefa) => tarefa.id));
    novaTarefa.id = ultimoID + 1;
  }
  novaTarefa.titulo = req.body.titulo;
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.listen(3000, () => {
  console.log("Servidor a correr na porta 3000");
});
