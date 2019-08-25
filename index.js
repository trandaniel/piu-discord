require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const Discord = require('discord.js');
const client = new Discord.Client();

const uri = process.env.MONGO_URI;


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on('message', msg => {
    console.log('token', process.env.COMMAND_TOKEN);
    console.log('msg.content', msg.content);
    if (msg.content.startsWith(process.env.COMMAND_TOKEN)) {
        var command = msg.content.slice(1);
        console.log('command', command);
        getSongs.then(function(val) {
            console.log('val', val);
            msg.reply("S1\n" + val);
        })
    }
})

client.login(process.env.BOT_TOKEN);

var getSongs = new Promise(function(resolve, reject) {
    MongoClient.connect(uri, function(err, dbClient) {
        console.log('connected db');
        var db = dbClient.db('piuxx');
        var coll = db.collection("singles");
        var document = coll.findOne( { level: 1 }, function(err, doc) {
            console.log('doc', doc);
            resolve(doc.songs);
        });
        dbClient.close();
    });
});

