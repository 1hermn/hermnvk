const VK = require('vk-io');
var traverse = require('traverse');
//const { HearManager } = require('@vk-io/hear');
//const config = require('./config.json')

const vk = new VK
vk.setToken(process.env.TOKEN)
vk.longpoll.start()
.then(() => {
  console.log('Long Poll started');
});
/*
const hearManager = new HearManager();

vk.updates.on('message_new', hearManager.middleware);*/

var new_msg = '';
var i = 0;
//добавить выбор.

vk.longpoll.on('message', async (message) => {
	if(message.text == '.start'){
		await message.send(`
			Circle CI, ты работаешь? Видимо нет..
			\nСвершилось! Бот запущен на сервере с автодеплоем с github'a!!!
			\nБот умеет получать все вложенные фотографии в сообщении.
			\nПерешлите сообщение с командой .getphoto
			\nПока что других функций нет.
      \nНаписать создателю [id188241464|Кто-то]
			`)
	}
  if(message.text == '.getphoto') {
  message.send("Начанию разбирать вложенные фотографии")
  if(message.flags[1] != 'outbox'){
  var msg = await vk.api.messages.getById({message_ids: message.id})
  traverse(msg).forEach(x => {
  	if(x.photo_1280 != undefined) {
  		//message.send(x.photo_1280)
  		//new_msg = newmsg + `${i}) ` + x.photo_1280 + "\n";
  		message.send(`${i}) ` + x.photo_1280)
  		i++
  	}
  })
}
}

});