const { fetchJson, range, parseMarkdown } = require('./lib/function')
const { Telegraf, Context } = require('telegraf')
const chalk = require('chalk')
const os = require('os')
const fs = require('fs')

// commands 
const help = require('./lib/help')
const tele = require('./lib/tele')
const yta = require('./command/download/yta.js')
const ytv = require('./command/download/ytv.js')
const twtdl = require('./command/download/twitter.js')
const yts = require('./command/download/yts.js')
const gsearch = require('./command/other/gsearch.js')

const { apikey, bot_token, owner, ownerLink, version, prefix } = JSON.parse(fs.readFileSync(`./config.json`))

let entertainment = {}

if (bot_token == '') {
	console.log('=== BOT TOKEN CANNOT BE EMPTY ===')
}

const bot = new Telegraf(bot_token)

bot.on('new_chat_members', async (luna) => {
	var message = luna.message
	var pp_group = await tele.getPhotoProfile(message.chat.id)
	var groupname = message.chat.title
	var groupmembers = await bot.telegram.getChatMembersCount(message.chat.id)
	for (x of message.new_chat_members) {
		var pp_user = await tele.getPhotoProfile(x.id)
		var full_name = tele.getUser(x).full_name
		console.log(chalk.whiteBright('├'), chalk.cyanBright('[  JOINS  ]'), chalk.whiteBright(full_name), chalk.greenBright('join in'), chalk.whiteBright(groupname))
		await luna.replyWithPhoto({
			url: `https://api.lolhuman.xyz/api/base/welcome?apikey=${apikey}&img1=${pp_user}&img2=${pp_group}&background=https://i.ibb.co/8B6Q84n/LTqHsfYS.jpg&username=${full_name}&member=${groupmembers}&groupname=${groupname}`,
		})
	}
})

bot.on('left_chat_member', async (luna) => {
	var message = luna.message
	var pp_group = await tele.getPhotoProfile(message.chat.id)
	var pp_user = await tele.getPhotoProfile(message.left_chat_member.id)
	var pp_group = await tele.getPhotoProfile(message.chat.id)
	var groupname = message.chat.title
	var groupmembers = await bot.telegram.getChatMembersCount(message.chat.id)
	var pp_user = await tele.getPhotoProfile(message.left_chat_member.id)
	var full_name = tele.getUser(message.left_chat_member).full_name
	console.log(chalk.whiteBright('├'), chalk.cyanBright('[  LEAVE  ]'), chalk.whiteBright(full_name), chalk.greenBright('leave from'), chalk.whiteBright(groupname))
	await luna.replyWithPhoto({ url: `https://api.lolhuman.xyz/api/base/leave?apikey=${apikey}&img1=${pp_user}&img2=${pp_group}&background=https://i.ibb.co/8B6Q84n/LTqHsfYS.jpg&username=${full_name}&member=${groupmembers}&groupname=${groupname}` })
})

bot.command('start', async (luna) => {
	user = tele.getUser(luna.message.from)
	await help.start(luna, user.full_name)
	await luna.deleteMessage()
})

bot.command('help', async (luna) => {
	user = tele.getUser(luna.message.from)
	await help.help(luna, user.full_name, luna.message.from.id.toString())
})

bot.on('callback_query', async (luna) => {
	cb_data = luna.callbackQuery.data.split('-')
	user_id = Number(cb_data[1])
	if (luna.callbackQuery.from.id != user_id) return luna.answerCbQuery('Descuple, você não pode usar esse botão.', { show_alert: true })
	callback_data = cb_data[0]
	user = tele.getUser(luna.callbackQuery.from)
	const isGroup = luna.chat.type.includes('group')
	const groupName = isGroup ? luna.chat.title : ''
	if (!isGroup) console.log(chalk.whiteBright('├'), chalk.cyanBright('[ ACTIONS ]'), chalk.whiteBright(callback_data), chalk.greenBright('from'), chalk.whiteBright(user.full_name))
	if (isGroup) console.log(chalk.whiteBright('├'), chalk.cyanBright('[ ACTIONS ]'), chalk.whiteBright(callback_data), chalk.greenBright('from'), chalk.whiteBright(user.full_name), chalk.greenBright('in'), chalk.whiteBright(groupName))
	if (callback_data == 'help') return await help[callback_data](luna, user.full_name, user_id)
	await help[callback_data](luna, user_id.toString())
})

bot.on('message', async (luna) => {
	try {
		const body = luna.message.text || luna.message.caption || ''
		comm = body.trim().split(' ').shift().toLowerCase()
		cmd = false
		if (prefix != '' && body.startsWith(prefix)) {
			cmd = true
			comm = body.slice(1).trim().split(' ').shift().toLowerCase()
		}
		const command = comm
		const args = await tele.getArgs(luna)
		const user = tele.getUser(luna.message.from)

		const reply = async (text) => {
			for (var x of range(0, text.length, 4096)) {
				return await luna.replyWithMarkdown(text.substr(x, 4096), { disable_web_page_preview: true })
			}
		}

		if (entertainment[luna.update.message.from.id] && entertainment[luna.update.message.from.id] === luna.update.message.text.toLowerCase()) {
			delete entertainment[luna.update.message.from.id]
			return reply('Sua resposta está correta.')
		}

		const isCmd = cmd
		const isGroup = luna.chat.type.includes('group')
		const groupName = isGroup ? luna.chat.title : ''

		const isImage = luna.message.hasOwnProperty('photo')
		const isVideo = luna.message.hasOwnProperty('video')
		const isAudio = luna.message.hasOwnProperty('audio')
		const isSticker = luna.message.hasOwnProperty('sticker')
		const isContact = luna.message.hasOwnProperty('contact')
		const isLocation = luna.message.hasOwnProperty('location')
		const isDocument = luna.message.hasOwnProperty('document')
		const isAnimation = luna.message.hasOwnProperty('animation')
		const isMedia = isImage || isVideo || isAudio || isSticker || isContact || isLocation || isDocument || isAnimation

		const quotedMessage = luna.message.reply_to_message || {}
		const isQuotedImage = quotedMessage.hasOwnProperty('photo')
		const isQuotedVideo = quotedMessage.hasOwnProperty('video')
		const isQuotedAudio = quotedMessage.hasOwnProperty('audio')
		const isQuotedSticker = quotedMessage.hasOwnProperty('sticker')
		const isQuotedContact = quotedMessage.hasOwnProperty('contact')
		const isQuotedLocation = quotedMessage.hasOwnProperty('location')
		const isQuotedDocument = quotedMessage.hasOwnProperty('document')
		const isQuotedAnimation = quotedMessage.hasOwnProperty('animation')
		const isQuoted = luna.message.hasOwnProperty('reply_to_message')

		var typeMessage = body.substr(0, 50).replace(/\n/g, '')
		if (isImage) typeMessage = 'Image'
		else if (isVideo) typeMessage = 'Video'
		else if (isAudio) typeMessage = 'Audio'
		else if (isSticker) typeMessage = 'Sticker'
		else if (isContact) typeMessage = 'Contact'
		else if (isLocation) typeMessage = 'Location'
		else if (isDocument) typeMessage = 'Document'
		else if (isAnimation) typeMessage = 'Animation'

		if (!isGroup && !isCmd) console.log(chalk.whiteBright('├'), chalk.cyanBright('[ PRIVATE ]'), chalk.whiteBright(typeMessage), chalk.greenBright('from'), chalk.whiteBright(user.full_name))
		if (isGroup && !isCmd) console.log(chalk.whiteBright('├'), chalk.cyanBright('[  GROUP  ]'), chalk.whiteBright(typeMessage), chalk.greenBright('from'), chalk.whiteBright(user.full_name), chalk.greenBright('in'), chalk.whiteBright(groupName))
		if (!isGroup && isCmd) console.log(chalk.whiteBright('├'), chalk.cyanBright('[ COMMAND ]'), chalk.whiteBright(typeMessage), chalk.greenBright('from'), chalk.whiteBright(user.full_name))
		if (isGroup && isCmd) console.log(chalk.whiteBright('├'), chalk.cyanBright('[ COMMAND ]'), chalk.whiteBright(typeMessage), chalk.greenBright('from'), chalk.whiteBright(user.full_name), chalk.greenBright('in'), chalk.whiteBright(groupName))

		var file_id = ''
		if (isQuoted) {
			file_id = isQuotedImage
				? luna.message.reply_to_message.photo[luna.message.reply_to_message.photo.length - 1].file_id
				: isQuotedVideo
				? luna.message.reply_to_message.video.file_id
				: isQuotedAudio
				? luna.message.reply_to_message.audio.file_id
				: isQuotedDocument
				? luna.message.reply_to_message.document.file_id
				: isQuotedAnimation
				? luna.message.reply_to_message.animation.file_id
				: ''
		}
		var mediaLink = file_id != '' ? await tele.getLink(file_id) : ''

		switch (command) {
			case 'help':
				await help.help(luna, user.full_name, luna.message.from.id.toString())
				break
			case 'test':
				test = await bot.telegram.getChatMembersCount(luna.message.chat.id)
				console.log(test)
				break
			/* Download commands */
			// youtube
			case 'yta':
				await yta.yta(luna)
				break
			case 'ytv':
				await ytv.ytv(luna)
				break
			case 'yts':
				await yts.yts(luna)
				break
			// others
			case 'twtdl':
				await twtdl.twtdl(luna)
				break
			case 'gsearch':
				await gsearch.gsearch(luna)
				break
		}
	} catch (e) {
		console.log(chalk.whiteBright('├'), chalk.cyanBright('[  ERROR  ]'), chalk.redBright(e))
	}
})

bot.launch({
	dropPendingUpdates: true,
})
bot.telegram.getMe().then((getme) => {
	itsPrefix = prefix != '' ? prefix : 'No Prefix'
	console.log(chalk.greenBright(' ===================================================='))
	console.log(chalk.greenBright(' │ + Owner    : ' + owner || ''))
	console.log(chalk.greenBright(' │ + Bot Name : ' + getme.first_name || ''))
	console.log(chalk.greenBright(' │ + Version  : ' + version || ''))
	console.log(chalk.greenBright(' │ + Host     : ' + os.hostname() || ''))
	console.log(chalk.greenBright(' │ + Platfrom : ' + os.platform() || ''))
	console.log(chalk.greenBright(' │ + Prefix   : ' + itsPrefix))
	console.log(chalk.greenBright(' ===================================================='))
	console.log(chalk.whiteBright('╭─── [ LOG ]'))
})
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
