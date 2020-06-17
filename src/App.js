import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((rep) => setRepositories(rep.data));
  }, []);

  async function handleAddRepository() {
    const repository = await api.post("repositories", {
      id: Date.now(),
      title: `Repository ${Date.now()}`,
      url: "git.teste.te",
      techs: ["nodejs", "reactjs"],
    });

    setRepositories([...repositories, repository.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    repositories.splice(repositoryIndex, 1);

    setRepositories([...repositories]);
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
