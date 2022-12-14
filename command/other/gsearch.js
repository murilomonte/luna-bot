const gsearch = require("googlethis");

exports.gsearch = async(luna) => {
	if (!args.length > 0) return await luna.reply("'query' need for this command");
	let gResult,
		data = null,
		img = null,
		// query = args.join(" ").replace(/\-(?:search|reverse|image)/g, "")
		query = args.join(" ").replace(/\-(?:search|reverse|image)/g, "")

	try {
		(gResult = await gsearch.image(query, { safe: false })),
			(data = gResult?.[Math.floor(Math.random() * gResult.length)]),
			(img = data?.url ? data.url : "https://telegra.ph/file/177a7901780b35d7123c7.png");
		await luna.replyWithPhoto(
			{ url: img },
			{ caption: `*Google Image Search*\n\n*${data?.origin?.title}*\nwidth: ${data?.width}\nheight: ${data?.height}` },
		)			
	} catch (e) {
		console.log(e);
		await luna.reply(`Err:\n${e.message}`);
	}
}
