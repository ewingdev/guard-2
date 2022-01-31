const Discord = require('discord.js');

exports.run = async (client, message, args) => {
	if (!message.guild) return message.author.sendMessage('Bu Komutu Sadece Sunucularda Kulanabilirsiniz!');

    const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
    const ewing = new Discord.MessageEmbed()
        .setColor("RED")
    .setTitle(`Ewing Guard`)
        .addField(" Sunucudaki üyeler", message.guild.memberCount)
        .addField(" Çevrimiçi üyeler", message.guild.members.cache.filter(m => !m.user.bot && m.user.presence.status !== "offline").size)
        .addField(" Seslideki üyeler", count)
        .addField(" Boost sayısı", message.guild.premiumSubscriptionCount, true)
        .addField(" Boost seviyesi", message.guild.premiumTier, true)
        .setFooter("Ewing Guard")
    message.channel.send(ewing);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sayı'],
    permLevel: 0
};

exports.help = {
    name: 'say',
    description: 'bu komut ewing tarafından yazılmıştır',
    usage: 'say'
};