const Downloader = require("../../utils/downloader");
const { yts } = new Downloader();
exports.yts = async(luna)  => {
		if (args.length < 1) return await luna.reply("Você tem que enviar esse comando seguido de um termo para pesquisa. \nEx: /yts horizontally spinning cat");
		const ytsData = await yts(args.join(" "), "long");
		let txt = `Resultados da busca por ${args.join(" ")}\n\n`;
		for (let i = 0; i < ytsData.length; i++) {
			txt += `\n📙 Título: ${ytsData[i].title}\n📎 Url: ${ytsData[i].url}\n🚀 Data de upload: ${ytsData[i].ago}\n`;
		}
		luna.reply(txt)
	}