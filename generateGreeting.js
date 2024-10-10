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

const fs = require("fs");
fs.writeFileSync("greeting.txt", getCurrentGreeting());
