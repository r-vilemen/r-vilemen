const getCurrentGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) return "Bom dia!";
  if (hour >= 12 && hour < 18) return "Boa tarde!";
  if (hour >= 18 && hour < 23) return "Boa noite!";
  return "Boa madrugada!";
};

const fs = require("fs");
fs.writeFileSync("greeting.txt", getCurrentGreeting());
