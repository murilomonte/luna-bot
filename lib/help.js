const fs = require('fs')
const config = JSON.parse(fs.readFileSync(`./config.json`))
prefix = config.prefix

exports.start = async(luna, name) => {
    text = `Olá ${name}! Tudo bem?\nEnvie ${prefix}help para saber o que eu sei fazer :)`
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
    text = `Download menu :
Aqui você encontra comandos para baixar coisas :)

${prefix}yts 
Descrição: use para fazer buscas no youtube.

${prefix}yta 
Descrição: use para baixar músicas no youtube.

${prefix}ytv 
Descrição: use para bauxar videos no youtube.

${prefix}twtdl
Descrição: use para baixar videos, fotos e gifs do twitter.

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
Em criação, volte mais tarde :)
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
Em criação, volte mais tarde :)
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