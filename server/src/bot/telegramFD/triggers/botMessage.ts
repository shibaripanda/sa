
// export const botMessage = async (bot, data) => {
//     try{
//         bot.on('message', async (ctx) => {

//             if(typeof ctx.message['photo'] !== "undefined" ){
//                 // const user = await data.userService.getUserByTelegramToken(ctx.from.id)
//                 // await appContext.app.upDateUserImage(data[2], 'photo', ctx.message.photo[0].file_id)
//                 console.log('photo')
//             }
//             // else if(typeof ctx.message['video'] !== "undefined"){
//             //     if(userRole() && typeof ctx.message['caption'] !== "undefined" && ctx.message.caption.includes('set', 0)){
//             //         const data = ctx.message.caption.split(' ')
//             //         console.log(ctx.message.video)
//             //         if(data[0] == 'set' && data[1] == 'image' && data.length == 3){
//             //             await appContext.app.upDateUserImage(data[2], 'video', ctx.message.video.file_id)
//             //         }
//             //     }
//             //     else{
//             //         setTimeout(async () => {
//             //             await ctx.telegram.deleteMessage(ctx.message.chat.id, ctx.message.message_id).catch(error => console.log(error))
//             //         }, fix.timeToDeleteMedia)
//             //     }
//             //     console.log('video')
//             // }

//         })
//     }
//     catch(error){
//         console.log(error)
//     }
// }
