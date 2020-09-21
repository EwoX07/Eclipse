const Discord = require("discord.js");
const config = require("../config.json")
const embed = new Discord.MessageEmbed()

module.exports.run = async (bot, message, args) => {
  if(!message.mentions.users.first()&&!args[0]) {
        embed.setTitle("Seu avatar 🖼️")
        embed.setColor(config.color)
        embed.setImage(`${message.author.avatarURL({ dynamic: true, size: 2048 })}`)
        embed.setTimestamp()
        return message.channel.send(embed)
    } 
    if(message.mentions.users.first()) {
        let mention = message.mentions.users.first()
        embed.setTitle(`Avatar de ${mention.tag} 🖼️`)
        embed.setColor(config.color)
        embed.setImage(`${mention.avatarURL({ dynamic: true, size: 2048 })}`)
        embed.setTimestamp()
        return message.channel.send(embed)  
    }
    if(isNaN(args[0])) return message.reply('insira um ID válido de um usuário ou mencione um.')
    try {
        var member = await bot.users.fetch(args[0]);
        embed.setTitle(`Avatar de ${member.tag} 🖼️`)
        embed.setColor(config.color)
        embed.setImage(`${member.displayAvatarURL({ dynamic: true, size: 2048 })}`)
        embed.setTimestamp()
        return message.channel.send(embed)
    } catch (err) {
        message.channel.send(":x: **Usuário não encontrado!**");
    }
    
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["av"]
}
exports.help = {
    nome: "avatar",
    descrição: "Mostra o avatar",
    uso: "avatar [ID, MENÇÃO]",
    categoria: "Outros"
}