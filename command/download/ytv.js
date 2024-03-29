import { YouTube } from "../../utils/youtube.js";
import { fetchBuffer, fetchText, textParse } from "../../utils/index.js";
import { validateURL } from "../../utils/youtube-url-utils.js"; 
import fs from "fs" 

const tube = new YouTube();
const lang = JSON.parse(fs.readFileSync(`./utils/text.json`))

export let ytv = async(luna, args) => {
    try {
        if (args.length < 1) return await luna.reply(`Você deve enviar esse comando seguido de um link.\nEx: /ytv https://youtu.be/...`);
        let { url, opt } = textParse(args.join(" "));

        if (!validateURL(url)) return await luna.reply(lang.ptbr.util.download.notYTURL);
        await luna.reply(lang.ptbr.util.download.progress);
        const res = await tube.yt(url, "video");
        if (res === "no_file") return await luna.reply("Não consegui baixar com o link que você enviou :/\nTenta outro");

                if (res.size >= 30 << 10) {
                    let short = await fetchText(`https://tinyurl.com/api-create.php?url=${res.dl_link}`);
                    let capt =
                        `*Título:* ${res.title}\n` +
                        `*Qualidade:* ${res.q}\n*Tamanho:* ${res.sizeF}\n*Download:* ${short}\n\n_Filesize to big_`;
                    await luna.reply(capt)
                } else {
                    let capt = `Title: ${res.title}\nSize: ${res.sizeF}`;
                    /*
                    await sock.sendMessage(
                        luna.from,
                        {
                            video: await fetchBuffer(res.dl_link, { skipSSL: true }),
                            mimetype: "video/mp4",
                            caption: capt,
                        },
                        { quoted: luna }
                    );
                    */
                    await luna.replyWithVideo(
                        { source: await fetchBuffer(res.dl_link, { skipSSL: true }) },
                        { 
                            caption: capt,
                            width: 1080, 
                            height: 720
                        }
                    )
                    
                }

    } catch (e) {
        console.log(e);
        await luna.reply("Infelizmente algo deu errado... :/\nTente novamente mais tarde.");
    }
}