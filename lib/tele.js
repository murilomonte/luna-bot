import { Telegraf } from 'telegraf'
import fs from 'fs'

const { bot_token } = JSON.parse(fs.readFileSync(`./config.json`))
const bots = new Telegraf(bot_token)

export let getArgs = async(ctx) => {
    try {
        var args = ctx.message.text
        var args = args.split(" ")
        args.shift()
        return args
    } catch { return [] }
}

export let getUser = (ctx) => {
    try {
        var user = ctx
        var last_name = user["last_name"] || ""
        var full_name = user.first_name + " " + last_name
        user["full_name"] = full_name.trim()
        return user
    } catch (e) { throw e }
}

export let getBot = async(ctx) => {
    try {
        var bot = ctx.botInfo
        var last_name = bot["last_name"] || ""
        var full_name = bot.first_name + " " + last_name
        bot["full_name"] = full_name.trim()
        return bot
    } catch { return {} }
}

export let getLink = async(file_id) => { try { return (await bots.telegram.getFileLink(file_id)).href } catch { throw "Error while get url" } }

export let getPhotoProfile = async(id) => {
    try {
        var url_default = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        if (String(id).startsWith("-100")) {
            var pp = await bots.telegram.getChat(id)
            if (!pp.hasOwnProperty("photo")) return url_default
            var file_id = pp.photo.big_file_id
        } else {
            var pp = await bots.telegram.getUserProfilePhotos(id)
            if (pp.total_count == 0) return url_default
            var file_id = pp.photos[0][2].file_id
        }
        return await this.getLink(file_id)
    } catch (e) { throw e }
}

export let getFile = async(file_id) => { try { return (await bots.telegram.getFile(file_id))} catch { throw "Error while downloading file" } }