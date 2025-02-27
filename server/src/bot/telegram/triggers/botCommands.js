import { fix } from "../fix.js"


export const botCommands = async (bot, appContext) => {
    try{
        bot.command(fix.commands, async (ctx) => {
            // const user = await getUser(ctx, appContext)
            if(ctx.command == 'delall' ){
            }
            else if(ctx.command){
                console.log('sdsdsdsdsdsdsdsdsdsd')
            }
        })
    }
    catch(error){
        console.log(error)
    }
}
