import { getUser } from "../getUser.js"


export const botChatMember = async (bot, appContext) => {
    try{
        bot.on('chat_member', async (ctx) => {

            
            console.log(ctx.update.chat_member)

            if(ctx.update.chat_member.new_chat_member.status == 'member'){
                const user = await getUser(ctx.update.chat_member, appContext)
                if(user.db.time.length !== 1) await user.in()
                await ctx.reply(appContext.app.db.welcomeMessage)
            }
            else if(ctx.update.chat_member.new_chat_member.status == 'left'){
                const user = await getUser(ctx.update.chat_member, appContext)
                await user.out()
                await ctx.reply(appContext.app.db.buyMessage)
            }
        })
    }
    catch(error){
        console.log(error)
    }
}
