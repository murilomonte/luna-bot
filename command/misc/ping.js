const { calculatePing } = require("../../utils");

exports.ping = async(luna) => {
		await luna.reply(`*Pong!*\nLevei ${calculatePing(luna.messageTimestamp, Date.now())} segundo(s) para te ressponder!`);
}
