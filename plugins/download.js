module.exports = { name: "download", alias: ["yt", "video", "audio"], desc: "Download YouTube videos or audio", category: "Downloader",

start: async (client, m, { text }) => {
    try {
        if (!text) return client.sendMessage(m.chat, { text: "❗ Send a valid YouTube link" });

        const link = text;
        const isYT = /youtu\.be|youtube\.com/.test(link);
        if (!isYT) return client.sendMessage(m.chat, { text: "❗ Only YouTube links are supported" });

        // Fetching using public API
        const axios = require('axios');
        const api = `https://api.vyt.download?url=${encodeURIComponent(link)}`;

        const { data } = await axios.get(api);

        if (!data || !data.status) {
            return client.sendMessage(m.chat, { text: "❗ Error: Unable to fetch the download links" });
        }

        // Sending video info
        await client.sendMessage(m.chat, { text: `📥 *Downloading Video*\n\n🎬 Title: ${data.title}` });

        // Send video
        await client.sendMessage(m.chat, {
            video: { url: data.video_url },
            caption: `✅ Download Complete!\n🎬 *${data.title}*`
        });

    } catch (err) {
        console.error(err);
        client.sendMessage(m.chat, { text: "⚠️ Error downloading video. Try again later." });
    }
}

};
