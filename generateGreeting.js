const fs = require("fs");

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
  if (hour >= 18 && hour < 24) return "Boa noite";
  return "Boa madrugada";
};

const readmePath = "README.md";
const readmeContent = fs.readFileSync(readmePath, "utf-8");

const newGreeting = getCurrentGreeting();

const startMarker = "<!-- start-greeting -->";
const endMarker = "<!-- end-greeting -->";
const regex = new RegExp(`${startMarker}([\\s\\S]*?)${endMarker}`, "i");
const match = readmeContent.match(regex);

if (match) {
  const currentGreeting = match[1].trim();

  if (currentGreeting !== newGreeting) {
    const updatedReadmeContent = readmeContent.replace(
      regex,
      `${startMarker} ${newGreeting} ${endMarker}`
    );

    fs.writeFileSync(readmePath, updatedReadmeContent);
    console.log("Saudação atualizada no README.md");
  } else {
    console.log("Saudação já está correta, nenhuma atualização necessária.");
  }
} else {
  console.error("Marcadores de saudação não encontrados no README.md");
}
