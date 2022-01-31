
const Discord = require("discord.js");
const client = new Discord.Client();

/*
15. satır hakkında:
  dnd: yazarsanız botunuz rahatsız etmeyin moduna geçecektir.
  idle: yazarsanız botunuz boşta moduna geçecektir.
  
*/

client.conf = {
  "token": "OTEwOTkwMTk3Mjg0NTY5MDg4.YZa3vA.bsbfzJsFhl5dwMMHInb8MiTiik8",
  "pref": "+",
  "own": "774591026940739585",
  "oynuyor": "Ewing Guard",
  "durum": "Ewing Guard"
}

client.on("message", message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(client.conf.pref)) return;
  let command = message.content.split(" ")[0].slice(client.conf.pref.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.yetkiler(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
})

client.on("ready", () => {
  console.log(`[EWING] Bütün komutlar yüklendi, bot çalıştırılıyor...`);
  console.log(`[EWING] ${client.user.username} ismi ile Discord hesabı aktifleştirildi!`);
  client.user.setStatus(client.conf.durum);
  let mob;
  if(client.conf.durum == "online") mob = "Çevrimiçi";
  if(client.conf.durum == "offline") mob = "Çevrimdışı";
  if(client.conf.durum == "idle") mob = "Boşta";
  if(client.conf.durum == "dnd") mob = "Rahatsız Etmeyin";
  console.log(`[EWING] Durum ayarlandı: ${mob}!`)
  client.user.setActivity(client.conf.oynuyor);
  console.log(`[EWING] Oynuyor ayarlandı!`);
})

const db = require("quick.db");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
var prefix = client.conf.prefix;

const log = message => {
  console.log(`[EWING] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} adet komut yüklenmeye hazır. Başlatılıyor...`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Komut yükleniyor: ${props.help.name}'.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.yetkiler = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if(message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if(message.member.hasPermission("MANAGE_ROLES")) permlvl = 2;
  if(message.member.hasPermission("MANAGE_CHANNELS")) permlvl = 3;
  if(message.member.hasPermission("KICK_MEMBERS")) permlvl = 4;
  if(message.member.hasPermission("BAN_MEMBERS")) permlvl = 5;
  if(message.member.hasPermission("ADMINISTRATOR")) permlvl = 6;
  if(message.author.id === message.guild.ownerID) permlvl = 7;
  if(message.author.id === client.conf.own) permlvl = 8;
  return permlvl;
};

///DOKUNMA

////////////////////////AYARLAMALI GUARD BAŞLANGIÇ

client.on("message", async msg => {
  var sistem = await db.fetch(`ddos`);
  if(sistem === true) {
    if(client.ping > 400) {
      var bölgeler = ['singapore', 'eu-central', 'india', 'us-central', 'london', 'eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong', 'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt','russia'];
      var yeniBölge = bölgeler[Math.floor(Math.random() * bölgeler.length)]
      msg.guild.setRegion(yeniBölge);
      let kanal = msg.guild.channels.find(c => c.name === "anti-ddos");
      if(!kanal) {
        msg.guild.createChannel(`anti-ddos`, `text`).then(ch => {
          let ever = msg.guild.roles.find(r => r.name === "@everyone")
          ch.overwritePermissions(ever, {
            VIEW_CHANNEL: false
          })
          setTimeout(async function() {
            ch.send(`<@${msg.guild.ownerID}>, selam Ewing Guard sunucunun pingi yükseldi lokasyon değiştirdim.`);
          }, 1500)
        })
      } else {
        kanal.send(`<@${msg.guild.ownerID}>, selam Ewing Guard sunucunun pingi yükseldi lokasyon değiştirdim.`)
      }
    }
  } else {
    
  }
})

client.on("emojiDelete", async emo => {
  var sistem = await db.fetch(`emo`);
  if(emo === null) return; else {
  const entry = await emo.guild
    .fetchAuditLogs({ type: "EMOJI_DELETE" })
    .then(audit => audit.entries.first());
  const exec = await emo.guild.members.get(entry.executor.id);
    if(exec.hasPermission("ADMINISTRATOR")) return
    exec.removeRoles(exec.roles)
    setTimeout(async function() {
      let role = emo.guild.roles.find(r => r.name === "Emoji Silen")
      if(!role) {
        emo.guild.createRole({
          name: 'Emoji Silen',
          color: 'GREY',
          position: emo.guild.roles.size - 1,
          permissions: []
        })
        .then(rol => {
          exec.addRole(rol)
        })
        .catch(e => console.error(e))
        setTimeout(async function() {

        })
      } else {
        exec.addRole(role)
      }
    }, 400)
  }
})

client.on("channelDelete", async channel => {
  var sistem = await db.fetch(`kanal`);
  if(sistem === null) return; else {
  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    .then(audit => audit.entries.first());
  const exec = await channel.guild.members.get(entry.executor.id);
    if(exec.hasPermission("ADMINISTRATOR")) return
    exec.removeRoles(exec.roles)
    setTimeout(async function() {
      let role = channel.guild.roles.find(r => r.name === "Kanal Silen")
      if(!role) {
        channel.guild.createRole({
          name: 'Kanal Silen',
          color: 'GREY',
          position: channel.guild.roles.size - 1,
          permissions: []
        })
        .then(rol => {
          exec.addRole(rol)
        })
        .catch(e => console.error(e))
        setTimeout(async function() {

        })
      } else {
        exec.addRole(role)
      }
    }, 400)
  }
})

client.on("guildMemberAdd", async member => {
  if(!member.user.bot) return;
  var sistem = await db.fetch(`rightbot`);
  if(sistem === null) return;
  let log = await member.guild.fetchAuditLogs().then(denetim => denetim.entries.first());
  let botuSokan = log.executor.id;
  if(member.guild.ownerID === botuSokan) return; else {
     let botuSokanv2 = await member.guild.members.get(botuSokan);
     let cezalı = member.guild.roles.find(r => r.name === "Bot Sokan")
     if(!cezalı) {
       try {
         member.guild.createRole({
           name: 'Bot Sokan',
           color: 'GREY',
           position: member.guild.roles.size - 1,
           permissions: []
         })
         .then(rol => {
           botuSokanv2.removeRoles(botuSokanv2.roles)
           setTimeout(async function() {
             botuSokanv2.addRole(rol)
           }, 500)
           .catch(e => console.error(e));
         })
       } catch (e) {
         console.log(e);
       }
     } else {
       try {
         botuSokanv2.removeRoles(botuSokanv2.roles)
         setTimeout(async function() {
           botuSokanv2.addRole(cezalı)
           member.ban(`Ewing Guard sistemi, ${botuSokanv2.user.tag} tarafından ${member.user.tag} botu sokuldu, sistem tarafından yasaklandı.`)
         }, 500)
       } catch (e) {
         console.log(e);
       }
     }
  }
})

client.on("roleDelete", async role => {
  let log = await role.guild.fetchAuditLogs({ type: 'ROLE_DELETE' }).then(kay => kay.entries.first())
  let exec = role.guild.members.get(log.executor.id)
  if(exec.hasPermission("ADMINISTRATOR")) return; else {
    let cezalı = role.guild.roles.find(r => r.name === "Rol Silen")
    if(!cezalı) {
      try {
        role.guild.createRole({
          name: 'Rol Silen',
          color: 'GREY',
          position: role.guild.roles.size - 1,
          permissions: []
        })
        .then(r => {
          exec.removeRoles(exec.roles)
          setTimeout(async function() {
            exec.addRole(r)
          }, 500)
        })
        .catch(e => console.error(e))
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        exec.removeRoles(exec.roles)
        setTimeout(async function() {
          exec.addRole(cezalı)
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
})



///////////////////////////////////////AYARLAMALI GUARD BİTİŞ

////////////////////////////////////LOG//////////////////////////
client.on("messageUpdate", async (oldMsg, newMsg) => {
  
  if (oldMsg.author.bot) return;
  
 // if (!logA[oldMsg.guild.id]) return;
  
  var user = oldMsg.author;
  
  //var kanal = oldMsg.guild.channels.get(logA[oldMsg.guild.id].log);
  
  if (db.has(`log_${oldMsg.guild.id}`) === false) return;
  
  var kanal = oldMsg.guild.channels.get(db.fetch(`log_${oldMsg.guild.id}`).replace("<#", "").replace(">", ""))
  if (!kanal) return;
  
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`Bir Mesaj Düzenlendi!`, oldMsg.author.avatarURL)
  .addField("Kullanıcı Tag", oldMsg.author.tag, true)
  .addField("ID", oldMsg.author.id, true)
  .addField("Eski Mesaj", "```" + oldMsg.content + "```")
  .addField("Yeni Mesaj", "```" + newMsg.content + "```")
  .setFooter(`Ewing Guard`)
  .setThumbnail(oldMsg.author.avatarURL)
  kanal.send(embed);
  
});

client.on("roleCreate", role => {
  
 // if (!logA[role.guild.id]) return;
  
  if (db.has(`log_${role.guild.id}`) === false) return;
  
  var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`).replace("<#", "").replace(">", ""))
  if (!kanal) return;
  
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`Bir Rol Oluşturuldu!`, role.guild.iconURL)
  .addField("Rol", `\`${role.name}\``, true)
  .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
  .setFooter(`Ewing Guard`)
  kanal.send(embed);
  
});

client.on("roleDelete", role => {
  
 // if (!logA[role.guild.id]) return;
  
  if (db.has(`log_${role.guild.id}`) === false) return;
  
 var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`).replace("<#", "").replace(">", ""))
  if (!kanal) return;
  
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`Bir Rol Kaldırıldı!`, role.guild.iconURL)
  .addField("Rol", `\`${role.name}\``, true)
  .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
  .setFooter(`Ewing Guard`)
  kanal.send(embed);
  
});

client.on("roleUpdate", role => {
  
 // if (!logA[role.guild.id]) return;
  
  if (db.has(`log_${role.guild.id}`) === false) return;
  
  var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`).replace("<#", "").replace(">", ""))
  if (!kanal) return;
  
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`Bir Rol Güncellendi!`, role.guild.iconURL)
  .addField("Rol", `\`${role.name}\``, true)
  .addField("Rol Rengi Kodu", `${role.hexColor}`, true)
  .setFooter(`Ewing Guard`)
  kanal.send(embed);
  
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  
 // if (!logA[oldMember.guild.id]) return;
  
  if (db.has(`log_${oldMember.guild.id}`) === false) return;
  
  var kanal = oldMember.guild.channels.get(db.fetch(`log_${oldMember.guild.id}`).replace("<#", "").replace(">", ""))
  if (!kanal) return;
  
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if(oldUserChannel === undefined && newUserChannel !== undefined) {

    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`${newMember.user.tag} adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`)
    .setFooter(`Ewing Guard`)
    
    kanal.send(embed);
    
  } else if(newUserChannel === undefined){

    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`${newMember.user.tag} adlı kullanıcı bir sesli kanaldan çıkış yaptı!`)
    .setFooter(`Ewing Guard`)
    kanal.send(embed);
    
  }
});

/////////////////////////////////////LOG BİTİŞ/////////////////////////////



client.login("ODA1NTM2MTQ0NzAzNzUwMTg1.YBcT_w.RdwyBgmR8fmjbx-JmAW-L0xplg0")