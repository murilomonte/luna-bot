// thanks to FaizBastomi (https://github.com/FaizBastomi)

import { YouTube } from "../../utils/youtube.js";
import { fetchBuffer, fetchText, textParse } from "../../utils/index.js";
import { validateURL } from "../../utils/youtube-url-utils.js";
import fs from "fs" 

const tube = new YouTube();

export let yta = async(luna, args) => {
    try {
        if (args.length < 1) return await luna.reply(`Você tem que enviar esse comando seguido de um link.\nEx: /yta https://youtu.be/...`);
        let { url, opt } = textParse(args.join(" "));
        if (!validateURL(url)) return await luna.reply("URL inválida.\nEnvie !yts ou pesquise o vídeo no youtube.");
        await luna.reply("Irei provicenciar!");
        
        const res = await tube.yt(url, "audio");
        if (res === "no_file") return await luna.reply("Não consegui baixar com o link que você enviou :/\nTenta outro :)");
                if (res.size >= 15 << 10) {
                    let short = await fetchText(`https://tinyurl.com/api-create.php?url=${res.dl_link}`);
                    let capt =
                        `*Título:* ${res.title}\n` +
                        `*Qualidade:* ${res.q}\n*Tamanho:* ${res.sizeF}\n*Download:* ${short}\n\nMuito pesado para ser enviado :(`;
                    await luna.reply(capt)
                } else {
                    let capt = `*Título:* ${ytsData[0].title}\nUrl: ${ytsData[0].url}\nData de upload: ${ytsData[0].ago}\nQualidade: ${res.q}\n\nDeseja o vídeo?\nTente enviar */ytv youtube_url*\n\nTô enviando a música, é rapidinho :)`
                    luna.reply(capt)
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
        await luna.reply("Infelizmente algo deu errado... :/\nTente novamente mais tarde.");
    }
}