// greeting.js
function getGreeting() {
  const hour = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "numeric",
    hour12: false,
  });
  const hourNum = parseInt(hour);

  if (hourNum >= 6 && hourNum < 12) {
    return "Bom dia";
  } else if (hourNum >= 12 && hourNum < 18) {
    return "Boa tarde";
  } else if (hourNum >= 18 && hourNum < 24) {
    return "Boa noite";
  } else {
    return "Boa madrugada";
  }
}

console.log(getGreeting());
