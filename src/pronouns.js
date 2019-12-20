const pronounsList = require('./pronounsList');
const pronounsArray = Object.keys(pronounsList);

const extractPronouns = function(message) {
  let command = message.content;
  let splitCommand;
  if (command.toLowerCase().startsWith('my pronouns are')) {
    try {
      splitCommand = command.split('are')[1].trim();
    } catch (e) {
      console.log('there was a problem splitting the command');
    }
  }
  return pronounsList[splitCommand];
};

const listPronouns = message => {
  let command = message.content;
  if (command.toLowerCase().startsWith('list available pronouns')) {
    let respText = '';
    pronounsArray.forEach(element => {
      respText += `- \`${element}\`\n`;
    });
    message.reply('the list of available pronouns has been sent via private message.');
    message.author.send(
      'Set your pronouns by saying `my pronouns are IDENTIFIER`, where IDENTIFIER is one of the following:\n' + respText
    );
  }
};

const setPronouns = function(roleName, guildRoles, member) {
  const role = guildRoles.find(r => r.name === roleName);
  if (role) {
    member
      .removeRoles(
        pronounsArray.map(rn => {
          return guildRoles.find(i => i.name === rn);
        })
      )
      .then(ret => {
        member.addRole(role).catch(console.error);
      });
    return `Success! We've set your pronouns to ${roleName}. Click on your avatar in the member list to see them.`;
  }
  return null;
};

const addPronouns = message => {
  let command = message.content;
  if (command.toLowerCase().startsWith('do pronoun setup') && process.env.ALLOW_PRONOUN_SETUP === 'yes') {
    let guild = message.guild;
    pronounsArray.forEach(r => {
      guild
        .createRole({
          name: r
        })
        .then(role => console.log(`Created new role with name ${role.name}`))
        .catch(console.error);
    });
  }
};

module.exports = {
  extractPronouns,
  setPronouns,
  listPronouns,
  addPronouns
};
