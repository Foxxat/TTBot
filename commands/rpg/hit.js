module.exports = {
	name: 'hit',
	description: 'Hit!',
	execute(message, args) {

		if (!args.length) {

				let hit_table = '```INI\n[Hit Table]: \n01-09 = Head\n10-24 = Left Arm\n25-44 = Right Arm\n45-79 = Body\n80-89 = Left Leg\n90-00 = Right Leg\n```';

					return message.channel.send(`${hit_table}`);
				}
			// return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		/*
		else if (args !== null && args !== '') {
			const name = args.join(' ');
			db.put(message.author.id, name);
			return message.channel.send(`Character name set as **${name}** for ${message.author}`);
		}
		*/
		// message.channel.send(`First argument: ${args[0]}`);
};
