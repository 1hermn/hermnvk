const {
  VK
} = require('vk-io');
const {
  HearManager
} = require('@vk-io/hear');
const config = require('./config.json')

const vk = new VK({
  token: process.env.TOKEN || config.token
});
/*
const hearManager = new HearManager();

vk.updates.on('message_new', hearManager.middleware);*/


vk.updates.on('message_new', async(context, next) => {

 })

  vk.updates.start().catch(console.error);