import fetch from "node-fetch";
import fs from "fs";

const TOKEN = process.env.GH_TOKEN;

if (!TOKEN) {
  console.error(
    "Token não encontrado. Certifique-se de que o token foi configurado corretamente."
  );
  process.exit(1);
}

const query = `{
  user(login: "r-vilemen") {
    pinnedItems(first: 6, types: [REPOSITORY]) {
      totalCount
      edges {
        node {
          ... on Repository {
            name
            url
            description
          }
        }
      }
    }
  }
}`;

const fetchPinnedProjects = async () => {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  return data.data.user.pinnedItems.edges;
};

const updateReadmeWithPinnedProjects = async () => {
  const pinnedProjects = await fetchPinnedProjects();

  const readmePath = "README.md";
  let readmeContent = fs.readFileSync(readmePath, "utf-8");

  const startMarker = "<!-- start-projects -->";
  const endMarker = "<!-- end-projects -->";

  let projectList = pinnedProjects
    .map((project) => {
      return `- [${project.node.name}](${project.node.url}) - ${project.node.description}`;
    })
    .join("\n");

  const newContent = `${startMarker}\n${projectList}\n${endMarker}`;

  const regex = new RegExp(`${startMarker}([\\s\\S]*?)${endMarker}`, "i");
  const match = readmeContent.match(regex);

  if (match) {
    const currentProjects = match[1].trim();

    if (currentProjects !== projectList.trim()) {
      const updatedReadmeContent = readmeContent.replace(regex, newContent);

      fs.writeFileSync(readmePath, updatedReadmeContent);
      console.log("README.md atualizado com projetos fixados.");
    } else {
      console.log(
        "Os projetos fixados já estão corretos, nenhuma atualização necessária."
      );
    }
  } else {
    console.error("Marcadores de projetos não encontrados no README.md");
  }
};

updateReadmeWithPinnedProjects();
