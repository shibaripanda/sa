// import { Telegraf } from 'telegraf'
// import { botStart } from 'src/bot/telegram/triggers/botStart'
// import { botMessage } from 'src/bot/telegram/triggers/botMessage'

// // export const telegramBot = async (data: any) => {
//     export const telegramBot = async () => {
//     try{
//         const option: any = {allowedUpdates: ['chat_member', 'callback_query', 'message', 'channel_post'], dropPendingUpdates: true}
//         const bot = new Telegraf(process.env.BOT_TOKEN)

//         // await botStart(bot, data)
//         // await botStart(bot)
//         // await botMessage(bot, data)

//         // await botChatMember(bot, appContext)
//         // await botCommands(bot, appContext)
//         // await botCallback(bot, appContext)

//         bot.launch(option)
//         process.once('SIGINT', () => bot.stop('SIGINT'))
//         process.once('SIGTERM', () => bot.stop('SIGTERM'))
//         return bot 
//     }
//     catch(error){
//         console.log(error)
//     } 
// }