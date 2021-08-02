const db = require('../../db');

module.exports = {
	name: 'roll',
	description: 'Roll dice.',
	usage: '\n!roll (max) : Roll single dice of (max) sides\n!roll (max) (target) : Roll single dice of (max) sides, and show target\n!roll (n)d(max) : Roll multiple dice, where (n) is number of dice of (max) sides.',
	execute(message, args) {

		function parseDice(character_text) {

			const regex = /^(?<qty>[0-9]*)d(?<max>[0-9]*)$/;
			const found = args[0].match(regex);

			let message_text = '';
			let message_numbers = '';
			let message_total = 0;

				if (found){
					if (!found.groups.qty) {
						found.groups.qty = 1;
					}
	
					const message_roll = `Rolling ${found.groups.qty} dice : (${found.groups.max})`;
	
					let i;
					for (i = 0; i < found.groups.qty; i++) {
						const number = Math.floor(Math.random() * found.groups.max) + 1;
						message_numbers += `${number} `;
						message_total = message_total + number;
					}
					message_text += '```diff\n+ ' + message_roll + ' +```';
					if (i > 1) {
						message_text += '```ini\n' + `Total : [ ${message_total} ]\n` + '```';
					}
				}
				else if (!isNaN(args[0]) && Number.isInteger(parseFloat(args[0]))) {

					const number = Math.floor(Math.random() * args[0]) + 1;
					const dicemax = args[0];

					const message_roll = `Rolling dice : (${dicemax})`;

					message_text += '```diff\n+ ' + message_roll + ' +```';
					message_numbers += `${number} `;
				} else {
					return message.channel.send('Sorry, I did not understand your command');
				}
	
				if (!isNaN(args[1]) && Number.isInteger(parseFloat(args[1]))) {
					const target = args[1];
					message_text += '```ini\n' + `Target : [ ${target} ]\n` + '```';
				}

			message_text += '```yaml\n' + `Dice Rolled : ${message_numbers}\n` + '```';
			return message.channel.send(`${message.author}` + character_text + '\n' + message_text);

		}


		const getCharacter = () => {
			return new Promise((resolve, reject) => {
				let message_text = '';
				try {
					db.get(message.author.id, function (err, value) {
						if (err) {
							message_text = `You have not set a character, you can use !character name`;
							//console.log(message_text);
							resolve(message_text);
							//reject(message_text)
						}
						else {
							message_text = ` - [ Character : ${value} ]`;
							resolve(message_text);
						}
					});
				} catch (error) {
					console.log(errror);
				}
			});
		}

		(async () => {

			if (!args.length) {
				return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
			}

			getCharacter().then(character_message => parseDice(character_message));

		})();

	},
};
