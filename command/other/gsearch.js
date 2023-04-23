const gsearch = require("googlethis");
const lang = require("../../utils/text.json");

exports.gsearch = async(luna) => {
	if (!args.length > 0) return await luna.reply("É preciso de um termo para pesquisa.");
	let gResult,
		data = null,
		img = null,
		query = args.join(" ").replace(/\-(?:search|reverse|image)/g, "")
	try {
		await luna.reply("Irei provicenciar!");
		(gResult = await gsearch.image(query, { safe: false })),
			(data = gResult?.[Math.floor(Math.random() * gResult.length)]),
			(img = data?.url ? data.url : "https://telegra.ph/file/177a7901780b35d7123c7.png");
		
		await luna.reply(lang.ptbr.util.download.progress);
		await luna.replyWithPhoto(
			{ url: img },
			{ caption: `**Pesquisa por imagem**\n\n*${data?.origin?.title}*\nLargura: ${data?.width}\nAltura: ${data?.height}` },
		)		
		await luna.reply("Prontinho!");
	} catch (e) {
		console.log(e);
		await luna.reply(`Erro:\n${e.message}`);
	}
}
