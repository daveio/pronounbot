const Http = require('http');
const httpPort = 3838;

const Discord = require('discord.js');

const pronounify = require('./src/pronouns');
const validate = require('./src/validate');

const token = process.env.DISCORD_API_TOKEN;

validate.token(token);

// Create an instance of a Discord client
const client = new Discord.Client();

client.on('ready', () => {
  console.log("I'm up!");
});

client.on('message', message => {

  if (message.author.bot) return;

  if (message.guild === null) {
    message.reply(`Please say commands in a channel, so the bot knows which instance you're from.
    You can say the following:
    \`list available pronouns   \` -- Get a list of available pronoun sets
    \`my pronouns are IDENTIFIER\` -- Set your pronouns to IDENTIFIER`);
  } else {
    pronounify.listPronouns(message);
    pronounify.addPronouns(message);
    pronounify.setPronouns(message);
  }
});

client.on('error', err => {
  console.log(err);
});

client.login(token);

// For setting up uptime robot / monitoring
const monitoringServer = Http.createServer((request, response) => {
  const statuses = {
    0: 'Ready',
    1: 'Connecting',
    2: 'Reconnecting',
    3: 'Idle',
    4: 'Nearly',
    5: 'Disconnected'
  };

  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(statuses[client.status]);
  response.end();
});

monitoringServer.listen(httpPort, err => {
  if (err) {
    return console.log('monitoring crashed', err);
  }
  console.log(`monitoring server is listening on ${httpPort}`);
});
