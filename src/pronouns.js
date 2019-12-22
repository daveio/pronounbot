const pronounsList = require('./pronounsList');
const pronounsArray = Object.keys(pronounsList);

const extractPronouns = function (content) {
  let command = content.toLowerCase();
  let splitCommand;

  if (!command.startsWith('my pronouns are')) return;

  try {
    splitCommand = command.split('are')[1].trim();
  } catch (e) {
    console.log('there was a problem splitting the command');
  }

  return pronounsList[splitCommand];
};

const listPronouns = function (message) {
  let command = message.content.toLowerCase();
  if (!command.startsWith('list available pronouns')) return;

  let respText = '';
  pronounsArray.forEach(element => {
    respText += `- \`${element}\`\n`;
  });
  message.reply('the list of available pronouns has been sent via private message.');
  message.author.send(
    'Set your pronouns by saying `my pronouns are IDENTIFIER`, where IDENTIFIER is one of the following:\n' + respText
  );
};

const setPronouns = function (message) {

  const roleName = extractPronouns(message.content);
  if (roleName === undefined || roleName === null) return;

  const guildRoles = message.guild.roles;
  const member = message.member;

  const role = guildRoles.find(r => r.name === roleName);
  if (!role) {
    return console.log('there was a problem setting roles, missing role?');
  }

  member
    .removeRoles(
      pronounsArray.map(rn => {
        return guildRoles.find(i => i.name === rn);
      })
    )
    .then(() => {
      member.addRole(role).catch(console.error);
    });
    return message.channel.send(`Success! We've set your pronouns to ${roleName}. Click on your avatar in the member list to see them.`);
};

const addPronouns = function (message) {
  let command = message.content.toLowerCase();
  if (!command.startsWith('do pronoun setup')) return;

  if (process.env.ALLOW_PRONOUN_SETUP !== 'yes') {
    return message.author.send('do pronoun setup isn\'t available on this instance');
  }

  let guild = message.guild;
  pronounsArray.forEach(r => {
    guild
      .createRole({
        name: r
      })
      .then(role => console.log(`Created new role with name ${role.name}`))
      .catch(console.error);
  });
};

module.exports = {
  addPronouns,
  extractPronouns,
  listPronouns,
  setPronouns
};
