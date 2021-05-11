const VK = require('vk-io');
var traverse = require('traverse');

const vk = new VK
vk.setToken(process.env.TOKEN)
vk.longpoll.start()
.then(() => {
  console.log('Long Poll started');
});

var new_msg = '';
var i = 0;

vk.longpoll.on('message', async (message) => {
	//TODO отдельным файлом
	if(message.text == '.start'){
		await message.send(`
			\nБот умеет получать все вложенные фотографии в сообщении.
			\nПерешлите сообщение с командой .getphoto
			\nВ будущем (пару дней) будет добавлена функция создания шпаргалки для тестов, уверен, пригодится всем.
		\nНаписать создателю [id188241464|Кто-то]
			`)
	}
	//разбор фотографий
	//TODO отдельным файлом
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
		i = 0;
		}
	}
	if(message.text.startWith('.newtest')){
		var args = message.text.split('r:');
		for(var i = 0; i < args.length; ++i){
			message.send(args[i])
		}
	}

});