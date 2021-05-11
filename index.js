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
	if(!message.isUser) return;
	//TODO отдельным файлом
	if(message.text == '.start'){
		await message.send(`
			\nБот умеет получать все вложенные фотографии в сообщении.
			\nПерешлите сообщение с командой .getphoto
			\nТо что всем понадобится когда-то:
			\n\tОтправляете с командой ответы на тест .newtest [Название] [Предмет] 
			\n\tДобавляет в базу по предмету и названию новый тест(разбирает на ответы и задания)
			\n\t.vewtests -> посмотреть все тесты
			\n\t.getsol [id теста] [первое слово в задании] -> даёт ответ на задание.
			\nP.S Получить ответы можно в личных сообщениях с ботом, лучше только там и использовать. Заносить в базу лучше в беседе
			\n\nP.P.S Пока что это шаблон того, как будет работать. Допишу, когда будет время, ещё и надо всё переписать, вк он такой, херовое API только и есть
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
	if(message.text.startsWith('.newtest')){
		var args = message.text.split(' ');
	}

});