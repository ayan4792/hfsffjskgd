const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
 config: {
 name: "coupledp",
 aliases: ["cpldp"],
 version: "1.0",
 author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
 countDown: 5,
 role: 0,
 shortDescription: {
 en: "couple dp"
 },
 longDescription: {
 en: "couple dp"
 },
 category: "image",
 guide: {
 en: "{n}"
 }
 },

  onStart: async function(){},
  onChat: async function({ message, event, args, commandName, api, usersData}) {
    const input = event.body;
          if(input && input.trim().toLowerCase().startsWith('cdp') ||     input && input.trim().toLowerCase().startsWith('coupledp')){
           const data = input.split(" ");
           data.shift();
    const prompt = data.join(" ");
 try {
 const { data } = await axios.get(
 "https://tanjiro-api.onrender.com/cdp?api_key=tanjiro"
 );
 const maleImg = await axios.get(data.male, { responseType: "arraybuffer" });
 fs.writeFileSync(__dirname + "/tmp/img1.jpg", Buffer.from(maleImg.data, "utf-8"));
 const femaleImg = await axios.get(data.female, { responseType: "arraybuffer" });
 fs.writeFileSync(__dirname + "/tmp/img2.jpg", Buffer.from(femaleImg.data, "utf-8"));

 const msg = "「 𝗛𝗲𝗿𝗲'𝘀 𝗬𝗼𝘂𝗿 𝗗𝗣✨ 」";
 const allImages = [
 fs.createReadStream(__dirname + "/tmp/img1.jpg"),
 fs.createReadStream(__dirname + "/tmp/img2.jpg")
 ];

 return api.sendMessage({
 body: msg,
 attachment: allImages
 }, event.threadID, event.messageID);
 } catch (error) {
 console.error(error);
 }
 }
}
};
