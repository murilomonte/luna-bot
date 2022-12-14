const Downloader = require("../../utils/downloader");
const { getInfo } = new Downloader();
const lang = require("../../utils/text.json");

exports.twtdl = async(luna) => {
	if (!args.length > 0 || !args[0].includes("twitter.com") || args[0].includes("t.co"))
	return await luna.reply("Você deve enviar esse comando seguido de um link.\nEx: /twtdl https://twitter.com/...");
	getInfo(args[0])
	.then(async (data) => {
		if (data.type === "video") {
			const content = data.variants
				.filter((x) => x.content_type !== "application/x-mpegURL")
				.sort((a, b) => b.bitrate - a.bitrate);
				await luna.replyWithVideo(
					{ url: content[0].url }
				)
		} else if (data.type === "photo") {
			for (let z = 0; z < data.variants.length; z++) {
				// await sock.sendMessage(luna.from, { image: { url: data.variants[z] } }, { quoted: luna });
				await luna.replyWithPhoto(
					{url: data.variants[z]}
				)
			}
		} else if (data.type === "animated_gif") {
			const content = data.variants[0]["url"];
			//await sock.sendMessage(luna.from, { video: { url: content } }, { quoted: luna });
			luna.replyWithVideo(
				{ url: content }
			)
		}
	})
	.catch(async () => {
		await luna.reply(
			lang.ptbr.util.download.twittFail
		);
	});
}