const fs = require("fs");

// Função para obter a saudação com base no horário de Brasília
const getCurrentGreeting = () => {
  const options = {
    timeZone: "America/Sao_Paulo",
    hour: "numeric",
    hour12: false,
  };
  const brHour = new Intl.DateTimeFormat("pt-BR", options).format(new Date());
  const hour = parseInt(brHour, 10);

  if (hour >= 6 && hour < 12) return "Bom dia";
  if (hour >= 12 && hour < 18) return "Boa tarde";
  if (hour >= 18 && hour < 23) return "Boa noite";
  return "Boa madrugada";
};

// Lê o conteúdo atual do README.md
const readmePath = "README.md";
const readmeContent = fs.readFileSync(readmePath, "utf-8");

// Gera a saudação
const greeting = getCurrentGreeting();

// Substitui o conteúdo entre os marcadores de saudação
const updatedReadmeContent = readmeContent.replace(
  /<!-- start-greeting -->.*<!-- end-greeting -->/,
  `<!-- start-greeting --> ${greeting} <!-- end-greeting -->`
);

// Grava o conteúdo atualizado no README.md
fs.writeFileSync(readmePath, updatedReadmeContent);
