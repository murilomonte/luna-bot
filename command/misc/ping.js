import { calculatePing } from "../../utils/index.js";

export let ping = async(luna) => {
		await luna.reply(`*Pong!*\nLevei ${calculatePing(luna.messageTimestamp, Date.now())} segundo(s) para te responder!`);
}
