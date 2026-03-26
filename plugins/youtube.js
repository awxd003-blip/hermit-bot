module.exports = {
    name: "play",
    alias: ["audio", "song"],
    desc: "Download audio/song in MP3 from YouTube",
    category: "Downloader",

    start: async (client, m, { text }) => {
        try {
            if (!text) {
                return client.sendMessage(m.chat, {
                    text: "❗ *Enter a song name or YouTube link*\n\nExample:\n```\n.play pasoori\n```"
                });
            }

            const axios = require("axios");

            // API for downloading mp3
            const api = `https://api.dreaded.tech/youtube/play?query=${encodeURIComponent(text)}`;
            const { data } = await axios.get(api);

            if (!data || !data.status) {
                return client.sendMessage(m.chat, {
                    text: "❗ Song not found. Try another name."
                });
            }

            // Send downloading message
            await client.sendMessage(m.chat, {
                text: `🎵 *Downloading Your Song...*\n\n🎶 *${data.title}*\
