const db = require('../../db');

module.exports = {
	name: 'roll',
	description: 'Roll!',
	execute(message, args) {

		function sendmessage(character_text) {

			const regex = /^(?<qty>[0-9]*)d(?<max>[0-9]*)$/;
			const found = args[0].match(regex);

			if (!args.length) {
				return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
			}
			else if (found) {
				if (!found.groups.qty) {
					found.groups.qty = 1;
				}
				let message_text = '';
				let message_numbers = '';
				let message_total = 0;

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
				message_text += '```yaml\n' + `Dice Rolled : ${message_numbers}\n` + '```';
				return message.channel.send(`${message.author}` + character_text + '\n' + message_text);
			}
			else if ((!isNaN(args[0]) && Number.isInteger(parseFloat(args[0]))) && (!isNaN(args[0]) && Number.isInteger(parseFloat(args[1])))) {
				let message_text = '';

				const number = Math.floor(Math.random() * args[0]) + 1;
				const dicemax = args[0];
				const target = args[1];

				const message_roll = `Rolling dice : (${dicemax})`;

				message_text += '```diff\n+ ' + message_roll + ' +```';
				message_text += '```ini\n' + `Target : [ ${target} ]\n` + '```';
				message_text += '```yaml\n' + `Dice Rolled : ${number}\n` + '```';
				return message.channel.send(`${message.author}` + character_text + '\n' + message_text);
			}
			else if (!isNaN(args[0]) && Number.isInteger(parseFloat(args[0]))) {
				let message_text = '';

				const number = Math.floor(Math.random() * args[0]) + 1;
				const dicemax = args[0];

				const message_roll = `Rolling dice : (${dicemax})`;

				message_text += '```diff\n+ ' + message_roll + ' +```';
				message_text += '```yaml\n' + `Dice Rolled : ${number}\n` + '```';
				return message.channel.send(`${message.author}` + character_text + '\n' + message_text);
			}

			message.channel.send('Sorry, I did not understand your command');
		}


		const getCharacter = () => {
			return new Promise((resolve, reject) => {
				let message_text = '';
				try {
					db.get(message.author.id, function (err, value) {
						if (err) {
							message_text = `You have not set a character, you can use !character name`;
							console.log(message_text);
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

			getCharacter().then(character_message => sendmessage(character_message));

			//const result = await dbcalls();
			//console.log('result: ' + result);

		})();

	},
};
