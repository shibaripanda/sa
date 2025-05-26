
// export const botStart = async (bot, data) => {
    export const botStart = async (ctx, userService) => {
    try{

        const res = await userService.getUserByTelegramId(ctx.from.id)
        console.log(res)
        console.log(ctx.from.id)
        // bot.start(async (ctx) => {
            // const res = await data.userService.getUserByTelegramToken(ctx.startPayload)
            // console.log(ctx.startPayload)
            // console.log(res)
            // if(res){
            //     if(!res.telegramId || res.telegramId !== ctx.from.id){
            //        await data.userService.updateTelegramId(res._id, ctx.from.id) 
            //     }
            //     await ctx.telegram.sendMessage(ctx.message.chat.id, 'Ok', {parse_mode: 'HTML'}).catch(error => console.log(error))
            // }
            // else{
            //     await ctx.telegram.sendMessage(ctx.message.chat.id, 'Ooops... canceled', {parse_mode: 'HTML'}).catch(error => console.log(error))
            // }
        // })
    }
    catch(error){
        console.log(error)
    }
}
