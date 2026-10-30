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
  console.log(idURL);
  if (Number.isNaN(idURL)) {
    return res.status(400).json({ mensagem: "O id tem de ser um número" });
  }
  const tarefa = tarefas.find((tarefaAtual) => tarefaAtual.id === idURL);
  if (tarefa === undefined) {
    return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  }
  res.json(tarefa);
});

app.listen(3000, () => {
  console.log("Servidor a correr na porta 3000");
});
