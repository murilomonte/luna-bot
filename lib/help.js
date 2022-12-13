const fs = require('fs')
const config = JSON.parse(fs.readFileSync(`./config.json`))
prefix = config.prefix

exports.start = async(luna, name) => {
    text = `Olá ${name}!\nEu me chamo Luna. O que deseja?\nEnvie ${prefix}help para saber o que eu sei fazer :)`
    await luna.replyWithMarkdown(text, { disable_web_page_preview: true })
}

exports.help = async(luna, name, user_id) => {
    text = `Olá ${name}! Aqui estão os comandos que você pode usar:`
    options = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Download 📥', callback_data: 'downloader-' + user_id }
                ],
                [
                    { text: 'Imagem aleatória 📷', callback_data: 'randimage-' + user_id },
                ],
                [
                    { text: 'Anime 🧸', callback_data: 'anime-' + user_id },
                ],
            ]
        }
    }
    try {
        await luna.editMessageText(text, options)
    } catch {
        await luna.reply(text, options)
    }
}

exports.downloader = async(luna, user_id) => {
    prefix = config.prefix
    text = `Downloader Menu :

❏ ${prefix}ytplay query
❏ ${prefix}ytsearch query
❏ ${prefix}ytmp3 link
❏ ${prefix}ytmp4 link
❏ ${prefix}tiktoknowm link
❏ ${prefix}tiktokmusic link
❏ ${prefix}tiktokmusic link
❏ ${prefix}twitterimage link
❏ ${prefix}spotify link
❏ ${prefix}spotifysearch query
❏ ${prefix}jooxplay query
❏ ${prefix}zippyshare link
❏ ${prefix}pinterest query
❏ ${prefix}pinterestdl link
❏ ${prefix}pixiv query
❏ ${prefix}pixivdl pixiv_id
`
    await luna.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Back', callback_data: 'help-' + user_id }
                ]
            ]
        }
    })
}

exports.anime = async(luna, user_id) => {
    prefix = config.prefix
    text = `Anime Menu :

❏ ${prefix}wait
❏ ${prefix}manga query
❏ ${prefix}anime query
❏ ${prefix}character query
❏ ${prefix}kusonime url_kusonime
❏ ${prefix}kusonimesearch query
❏ ${prefix}otakudesu url_otakudesu
❏ ${prefix}otakudesusearch query
`
    await luna.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Back', callback_data: 'help-' + user_id }
                ]
            ]
        }
    })
}


exports.randimage = async(luna, user_id) => {
    prefix = config.prefix
    text = `Radom Image Menu :

❏ ${prefix}art
❏ ${prefix}bts
❏ ${prefix}exo
❏ ${prefix}elf
❏ ${prefix}lunai
❏ ${prefix}neko
❏ ${prefix}waifu
❏ ${prefix}shota
❏ ${prefix}husbu
❏ ${prefix}sagiri
❏ ${prefix}shinobu
❏ ${prefix}megumin
❏ ${prefix}wallnime
❏ ${prefix}chiisaihentai
❏ ${prefix}trap
❏ ${prefix}blowjob
❏ ${prefix}yaoi
❏ ${prefix}ecchi
❏ ${prefix}hentai
❏ ${prefix}ahegao
❏ ${prefix}holunaewd
❏ ${prefix}sideoppai
❏ ${prefix}animefeets
❏ ${prefix}animebooty
❏ ${prefix}animethighss
❏ ${prefix}hentaiparadise
❏ ${prefix}animearmpits
❏ ${prefix}hentaifemdom
❏ ${prefix}lewdanimegirls
❏ ${prefix}biganimetiddies
❏ ${prefix}animebellybutton
❏ ${prefix}hentai4everyone
❏ ${prefix}bj
❏ ${prefix}ero
❏ ${prefix}cum
❏ ${prefix}feet
❏ ${prefix}yuri
❏ ${prefix}trap
❏ ${prefix}lewd
❏ ${prefix}feed
❏ ${prefix}eron
❏ ${prefix}solo
❏ ${prefix}gasm
❏ ${prefix}poke
❏ ${prefix}anal
❏ ${prefix}holo
❏ ${prefix}tits
❏ ${prefix}kuni
❏ ${prefix}kiss
❏ ${prefix}erok
❏ ${prefix}smug
❏ ${prefix}baka
❏ ${prefix}solog
❏ ${prefix}feetg
❏ ${prefix}lewdk
❏ ${prefix}waifu
❏ ${prefix}pussy
❏ ${prefix}femdom
❏ ${prefix}cuddle
❏ ${prefix}hentai
❏ ${prefix}eroyuri
❏ ${prefix}cum_jpg
❏ ${prefix}blowjob
❏ ${prefix}erofeet
❏ ${prefix}holoero
❏ ${prefix}classic
❏ ${prefix}erokemo
❏ ${prefix}fox_girl
❏ ${prefix}futanari
❏ ${prefix}lewdkemo
❏ ${prefix}wallpaper
❏ ${prefix}pussy_jpg
❏ ${prefix}kemonomimi
❏ ${prefix}nsfw_avatar
`
    await luna.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Back', callback_data: 'help-' + user_id }
                ]
            ]
        }
    })
}

exports.messageError = async(luna) => {
    await luna.reply(`Error! Por favor reporte isso para o [${config.owner}](${config.ownerLink})`, { parse_mode: "Markdown", disable_web_page_preview: true })
}