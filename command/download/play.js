import { YouTube } from "../../utils/youtube.js";
import { fetchBuffer, fetchText } from "../../utils/index.js";

const tube = new YouTube();

export let play = async(luna, args) => {
		if (args.length < 1) return await luna.reply("Sem resultados para a busca. :/");
		const ytsData = await tube.yts(args.join(" "), "short");

		if (!ytsData.length > 0) return await luna.reply("Não foi encontrado nenhum vídeo com esse nome. :/\nTente outro.");

		let thumb = await fetchBuffer(ytsData[0].thumbnail);
		const res = await tube.yt(ytsData[0].url, "audio");

        await luna.reply("Irei provicenciar!");

		if (res === "no_file") return await luna.reply("Não foi encontrado nenhum link de download, talvez você devesse tentar outro...");

		try {
			if (res.size >= 10 << 10) {
				let short = await fetchText(`https://tinyurl.com/api-create.php?url=${res.dl_link}`);
				let capt = `O tamanho do arquivo é muito grande para ser enviado :(\nMas você pode usar esse link pra baixar!: ${short}`;
				luna.reply(capt)
			} else {
				await luna.reply("Um minutinho...\nQuase lá!");
				await luna.replyWithAudio(
					{ source: await fetchBuffer(res.dl_link, { skipSSL: true }), mimetype: "audio/mpeg" },
					{
						title: res.title,
						thumb: { source: thumb },
						performer: 'MissLuna_Bot'
					}
				);
				await luna.reply('Prontinho!');
			}
		} catch (e) {
			console.log(e);
			await luna.reply("Ocorreu algo de errado ao enviar o arquivo :/\nTenta novamente daqui alguns minutos, ok?");
		}
}
