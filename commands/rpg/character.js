const db = require('../../db');

module.exports = {
	name: 'character',
	description: 'Set your character.',
	execute(message, args) {

		if (!args.length) {
			db.get(message.author.id, function(err, value) {
				if (err) {
					return message.channel.send(`We do not have a character and you didn't provide any arguments, ${message.author}!`);
				}
				else {
					return message.channel.send(`Your character name is : ${value}`);
				}
			});
			// return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		else if (args !== null && args !== '') {
			const name = args.join(' ');
			db.put(message.author.id, name);
			return message.channel.send(`Character name set as **${name}** for ${message.author}`);
		}
		// message.channel.send(`First argument: ${args[0]}`);
	},
};
