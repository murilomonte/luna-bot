// thanks to FaizBastomi (https://github.com/FaizBastomi)

const Downloader = require("../../utils/downloader.js");
const { yt } = new Downloader();
const { fetchText, textParse, fetchBuffer } = require("../../utils");
const lang = require("../../utils/text.json");
const { validateURL } = require("../../utils/youtube-url-utils"); 

exports.yta = async(luna) => {
    try {
        if (args.length < 1) return await luna.reply(`Você tem que enviar esse comando seguido de um link.\nEx: /yta https://youtu.be/...`);
        let { url, opt } = textParse(args.join(" "));
        if (!validateURL(url)) return await luna.reply(lang.ptbr.util.download.notYTURL);
        await luna.reply("Irei provicenciar!");
        
        const res = await yt(url, "audio");
        if (res === "no_file") return await luna.reply("Não consegui baixar com o link que você enviou :/\nTenta outro :)");
                if (res.size >= 15 << 10) {
                    let short = await fetchText(`https://tinyurl.com/api-create.php?url=${res.dl_link}`);
                    let capt =
                        `*Título:* ${res.title}\n` +
                        `*Qualidade:* ${res.q}\n*Tamanho:* ${res.sizeF}\n*Download:* ${short}\n\nMuito pesado para ser enviado :(`;
                    await luna.reply(capt)
                } else {
                    await luna.reply(lang.ptbr.util.download.progress);
                    let fetch = await fetchBuffer(res.dl_link, { skipSSL: true })
                    await luna.replyWithAudio( 
                        { source: fetch },
                        { title: res.title }
                    );
                    await luna.reply('Prontinho!');
                }
    } catch (e) {
        console.log(e);
        await luna.reply("Infelizmente algo deu errado... :/\nTente novamente mais tarde.");
    }
}