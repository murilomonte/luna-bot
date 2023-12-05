import Downloader from "../../utils/downloader.js";
import { fetchBuffer, fetchText } from "../../utils/index.js";

const { yt, yts } = new Downloader();

export let play = async(luna) => {
		if (args.length < 1) return await luna.reply("Sem resultados para a busca. :/");
		const ytsData = await yts(args.join(" "), "short");
		if (!ytsData.length > 0) return await luna.reply("Não foi encontrado nenhum vídeo com esse nome. :/\nTente outro.");
		let thumb = await fetchBuffer(ytsData[0].thumbnail);
		const res = await yt(ytsData[0].url, "audio");
		if (res === "no_file") return await luna.reply("Não foi encontrado nenhum link de download, talvez você devesse tentar outro...");

		try {
			if (res.size >= 10 << 10) {
				let short = await fetchText(`https://tinyurl.com/api-create.php?url=${res.dl_link}`);
				let capt =
					`*Título:* ${res.title}\n` +
					`*Qualidade:* ${res.q}\n*Tamanho:* ${res.sizeF}\n*Download:* ${short}\n\n_O tamanho do arquivo é muito grande para ser enviado :(_`;
				await luna.replyWithPhoto({ url: thumb }, { caption: capt });
			} else {
				let capt = `*Título:* ${ytsData[0].title}\nUrl: ${ytsData[0].url}\nData de upload: ${ytsData[0].ago}\nQualidade: ${res.q}\n\nDeseja o vídeo?\nTente enviar */ytv youtube_url*\n\nTô enviando a música, é rapidinho :)`
				await luna.replyWithPhoto(
					{ source: thumb }, 
					{ 
						caption: capt,
						parse_mode: 'Markdown'
					}
				)
				await luna.replyWithAudio(
					{ source: await fetchBuffer(res.dl_link, { skipSSL: true }), mimetype: "audio/mpeg" },
					{
						title: res.title, 
						thumb: { source: thumb },
						performer: 'MissLuna_Bot'
					}
				);
			}
		} catch (e) {
			console.log(e);
			await luna.reply("Ocorreu algo de errado ao enviar o arquivo :/\nTenta novamente daqui alguns minutos, ok?");
		}
}
