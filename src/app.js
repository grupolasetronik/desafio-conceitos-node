const express = require("express");
const cors = require("cors");
const { v4: uuid, isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;
  const result = { id: uuid(), likes: 0, techs: techs, title: title, url: url   };
  repositories.push(result)
  return response.json(result);
});

app.put("/repositories/:id", (request, response) => {

  const { id } = request.params;
  const { title, url, techs} = request.body;
  
  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) return response.status(400).json({ error: "Repo not found" });

  const {likes} = repositories[repoIndex] 

  repositories[repoIndex] = { id, techs, title, url , likes};
   
  return response.json(repositories[repoIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(repo => repo.id === id);
  
  if (repoIndex < 0) {
    return response.status(400).send();
  };

  repositories.splice(repoIndex,1);

  return response.status(204).send("");

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const repoIndex = repositories.findIndex(repo => repo.id === id);
  
  if (repoIndex < 0) return response.status(400).send("")
 
  repositories[repoIndex].likes += 1
  
  console.log(repositories[repoIndex]);

  return response.json(repositories[repoIndex])

});

module.exports = app;
