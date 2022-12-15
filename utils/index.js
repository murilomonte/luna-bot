// thanks to FaizBastomi (https://github.com/FaizBastomi)

const Bluebird = require("bluebird");
const moment = require("moment-timezone");
const https = require("https");
const axios = require("axios").default;
const { fromBuffer } = require("file-type");
// https://github.com/sindresorhus/file-type/issues/535

const fetchText = async function (url) {
	let response;
	try {
		const resp = await axios.get(url, { responseType: "text" });
		response = resp.data;
	} catch (e) {
		throw e;
	} finally {
		return response;
	}
};

const fetchBuffer = async (url, config = { skipSSL: false, fixAudio: false }) =>
	new Bluebird(async (resolve, reject) => {
		let data1, data2, data3, tmp, out;
		try {
			if (config.skipSSL) config = { httpsAgent: new https.Agent({ rejectUnauthorized: false }), ...config };
			delete config.skipSSL;
			data1 = await axios.get(url, { responseType: "arraybuffer", ...config });
			const { ext } = await fromBuffer(data1.data);
			if (/webp/.test(ext)) {
				tmp = join(__dirname, "../temp", getRandom() + ".webp");
				out = tmp + ".png";
				fs.writeFile(tmp, data1.data, async (err) => {
					if (err) reject(err) && fs.unlinkSync(tmp);
					await webp.dwebp(tmp, out, "-o");
					data2 = fs.readFileSync(out);
					resolve(data2);
					fs.unlinkSync(tmp), fs.unlinkSync(out);
				});
			} else {
				data3 = new Buffer.from(data1.data);
				if (config.fixAudio) {
					data3 = await convert.toAudio(data3, "mp3").catch(reject);
					resolve(data3);
				} else {
					resolve(data3);
				}
			}
			(data1 = null), (data2 = null), (data3 = null);
		} catch (e) {
			reject(e);
		}
	});

const textParse = function (text) {
	const ytRex = /(?:https?:\/{2})?(?:w{3}|m|music)?\.?youtu(?:be)?\.(?:com|be)(?:watch\?v=|\/)([^\s&]+)/g;
	const optRex = /--(?:doc|ptt)/g;
	let ytUrl = text.match(ytRex);
	let opts = text.match(optRex);
	return { url: ytUrl == null ? "" : ytUrl[0], opt: opts == null ? "" : opts[0] };
};

const UserAgent = () => {
	const UA = [
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8",
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
		"Mozilla/5.0 (X11; Datanyze; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/E7FBAF",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:33.0) Gecko/20100101 Firefox/33.0",
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Edge/15.15063",
		"Mozilla/5.0 (X11; Linux x86_64; rv:45.0) Gecko/20100101 Firefox/45.0",
		"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:47.0) Gecko/20100101 Firefox/47.0",
		"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36",
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
		"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:57.0) Gecko/20100101 Firefox/57.0",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/601.2.7 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.7",
		"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36",
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36",
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
		"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0",
		"Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:47.0) Gecko/20100101 Firefox/47.0",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7",
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36",
	];
	const res = UA[~~(Math.random() * UA.length)];
	return res;
};

const calculatePing = function (timestamp, now) {
	return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};

module.exports = {
	fetchText,  
	fetchBuffer,
	textParse,
    UserAgent,
	calculatePing
};
