const config = require("../config.json");
const { bot } = require("../index");
const ptbr = JSON.parse(JSON.stringify(bot.idiomas.pt))
const enus = JSON.parse(JSON.stringify(bot.idiomas.en))
bot.on("message", async message => {

    if(message.author.bot) return;
    let prefix;
    if(!message.guild) prefix = "e."
    if(message.guild) prefix = config.prefix
    let messageArray = message.content.split(' ').join(' ').split(" ");
    let cmd = messageArray[0]
    let args = messageArray.slice(1).trim()
    let idioma = bot.idioma.get(message.guild.id) || 'pt'
    switch (idioma.toLowerCase()) {
    case 'pt':
    idioma = ptbr
    break;
    case 'en':
    idioma = enus
    break;
    default:
    idioma = ptbr
    break;
    }
    if(message.content.startsWith('<@')&&message.content.endsWith(bot.user.id+'>')) return message.channel.send(`${idioma.message.inico} **${message.author.tag}**, ${idioma.message.meio} \`${config.prefix}\`, ${idioma.message.use} \`${config.prefix}ajuda\` ${idioma.message.ou} \`${config.prefix}help\` ${idioma.message.final} ❤️`)
    if(!message.content.startsWith(prefix)) return;
    var commandfile = bot.commands.get(cmd.slice(prefix.length).toLowerCase());
    if(!commandfile) commandfile = bot.aliases.get(cmd.slice(prefix.length).toLowerCase())
    if(!message.guild&&commandfile.conf.guildOnly) return message.channel.send("Este comando não esta ativado para DM").catch(e => bot.channels.cache.get("746448706772926554").send(e))
    if(commandfile) commandfile.run(bot,message,args,idioma);
})
