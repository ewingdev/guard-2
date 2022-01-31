const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, msg, args) => {
  var prefix = client.conf.pref
  if(args[0] === "yardım") {
    msg.channel.send(new Discord.MessageEmbed().setTitle("").setDescription(`Ewing Guard\n**DDOS**: ${prefix}guard ddos aç/kapat\n**Emoji**: ${prefix}guard emoji aç/kapat\n**Kanal**: ${prefix}guard kanal aç/kapat\n**Rol**: ${prefix}guard rol aç/kapat\n**Bot**: ${prefix}guard bot aç/kapat\nEwing Guard\n`).setFooter(msg.author.tag, msg.author.displayAvatarURL).setColor("RANDOM"))
  } else if(args[0] === "ddos") {
    let sistem = await db.fetch(`ddos`)
    let ayar = args[1]
    if(ayar === "aç") {
      db.set(`ddos`, true)
      msg.channel.send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`DDOS Koruma sistemi aktif!!`).setFooter(msg.author.tag, msg.author.displayAvatarURL))
    } else if(ayar === "kapat") {
      if(sistem === null) {
        msg.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`DDOS Koruma sistemi kapatıldı! Bot artık sunucu pingini yönetmeyecek. `).setFooter(msg.author.tag, msg.author.displayAvatarURL))
      } else {
        db.delete(`ddos`)
      }
    }
  } else if(args[0] === "emoji") {
    let sistem = await db.fetch(`emo`)
    let ayar = args[1]
    if(ayar === "aç") {
      db.set(`emo`, true)
      msg.channel.send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`Emoji koruma sistemi açıldı! `).setFooter(msg.author.tag, msg.author.displayAvatarURL))
    } else if(ayar === "kapat") {
      if(sistem === null) {
        msg.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`Emoji koruma sistemi kapatıldı.`).setFooter(msg.author.tag, msg.author.displayAvatarURL))
      } else {
        db.delete(`emo`)
      }
    }
  } else if(args[0] === "kanal") {
    let sistem = await db.fetch(`kanal`)
    let ayar = args[1]
    if(ayar === "aç") {
      db.set(`kanal`, true)
      msg.channel.send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`Kanal koruma sistemi açıldı! `).setFooter(msg.author.tag, msg.author.displayAvatarURL))
    } else if(ayar === "kapat") {
      if(sistem === null) {
        msg.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`Kanal koruma sistemi kapatıldı.`).setFooter(msg.author.tag, msg.author.displayAvatarURL))
      } else {
        db.delete(`kanal`)
      }
    }
  } else if(args[0] === "rol") {
    let sistem = await db.fetch(`rol`)
    let ayar = args[1]
    if(ayar === "aç") {
      db.set(`rol`, true)
      msg.channel.send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`Rol koruma sistemi açıldı! `).setFooter(msg.author.tag, msg.author.displayAvatarURL))
    } else if(ayar === "kapat") {
      if(sistem === null) {
        msg.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`Rol koruma sistemi kapatıldı. `).setFooter(msg.author.tag, msg.author.displayAvatarURL))
      } else {
        db.delete(`rol`)
      }
    }
  } else if(args[0] === "bot") {
    let sistem = await db.fetch(`rightbot`)
    let ayar = args[1]
    if(ayar === "aç") {
      db.set(`rightbot`, true)
      msg.channel.send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`Bot koruma sistemi açıldı! `).setFooter(msg.author.tag, msg.author.displayAvatarURL))
    } else if(ayar === "kapat") {
      if(sistem === null) {
        msg.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`Bot koruma sistemi kapatıldı.`).setFooter(msg.author.tag, msg.author.displayAvatarURL))
      } else {
        db.delete(`rightbot`)
      }
    }
  } else if(args[0] === "sağ-tık-ban") {
    let sistem = await db.fetch(`rightban`)
    let ayar = args[1]
    if(ayar === "aç") {
      db.set(`rightban`, true)
      msg.channel.send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`Sağ tık ban sistemi açıldı! `).setFooter(msg.author.tag, msg.author.displayAvatarURL))
    } else if(ayar === "kapat") {
      if(sistem === null) {
        msg.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`Sağ tık ban sistemi kapatıldı.`).setFooter(msg.author.tag, msg.author.displayAvatarURL))
      } else {
        db.delete(`rightban`)
      }
    }
  } else if(args[0] === "sağ-tık-kick") {
    let sistem = await db.fetch(`rightkick`)
    let ayar = args[1]
    if(ayar === "aç") {
      db.set(`rightkick`, true)
      msg.channel.send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`Sağ tık kick sistemi açıldı! `).setFooter(msg.author.tag, msg.author.displayAvatarURL))
    } else if(ayar === "kapat") {
      if(sistem === null) {
        msg.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`Sağ tık kick sistemi kapatıldı `).setFooter(msg.author.tag, msg.author.displayAvatarURL))
      } else {
        db.delete(`rightkick`)
      }
    }
  } else if(!args[0]) {
    msg.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`Guard sistemi için **${prefix}guard yardım** yazarak yardım alabilirsiniz.`).setFooter(msg.author.tag, msg.author.displayAvatarURL))
  }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["koruma"],
  permLevel: 4
};

exports.help = {
  name: "guard"
};