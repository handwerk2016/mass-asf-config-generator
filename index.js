const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'), // Reading 'login:password' strings from file
  crlfDelay: Infinity
});

let data = [];
rl.on('line', (line) => {
  data.push(line.split(':')) // Parsing 'login:password' strings
});

rl.on('close', () => {
  const configTemplate = JSON.parse(fs.readFileSync('config_template.json')) // Loading template
  let totalaccs = 0

  data.forEach(([login, password]) => {
    const config = { ...configTemplate }
    config.SteamLogin = login
    config.SteamPassword = password
    const fileName = `${login}.json` // Writing file with account login's name
    fs.writeFileSync("output/" + fileName, JSON.stringify(config, null, 2));
    totalaccs++
  });
  console.log("Written " + totalaccs + " bot configs")
});
