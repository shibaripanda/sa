import  rateLimit  from 'telegraf-ratelimit'
import { fix } from "../../fix.js"
import { User } from "../models/User.js"
import { getUser } from "../modules/getUser.js"
import { bunUser } from "../modules/bunUser.js"
import { editDown } from "../modules/editDown.js"
import { heartMinus } from "../modules/heartMinus.js"
import { loveScreen } from "../screens/loveScreen.js"
import { mainScreen } from "../screens/mainScreen.js"
import { blokScreen } from "../screens/blokScreen.js"
import { controlAdd } from "../modules/controlAdd.js"
import { seachFilter } from "../modules/seachFiltre.js"
import { startScreen } from "../screens/startScreen.js"
import { errorScreen } from "../screens/errorScreen.js"
import { controlStop } from "../modules/controlStop.js"
import { editTopDown } from "../modules/editTopDown.js"
import { testBadMedia } from '../modules/testBadMedia.js'
import { filterScreen } from "../screens/filterScreen.js"
import { dialogScreen } from "../screens/dialogScreen.js"
import { deleteDialog } from "../modules/deleteDialog.js"
import { profileScreen } from "../screens/profileScreen.js"
import { deleteProfile } from "../modules/deleteProfile.js"
import { messegesScreen } from "../screens/messegesScreen.js"
import { calendarScreen } from "../screens/calendarScreen.js"
import { startScreenLeng } from "../screens/startScreenLeng.js"
import { editUserProfile } from "../modules/editUserProfile.js"
import { pushUserProfile } from "../modules/pushUserProfile.js"
import { testLikePartner } from "../modules/testLikePartner.js"
import { updateUserMongo } from "../modules/updateUserMongo.js"
import { testAvalibleDialog } from "../modules/testAvalibleDialog.js"
import { updateObjectDialog } from "../modules/updateObjectDialog.js"
import { deleteUserFromMain } from "../modules/deleteUserFromMain.js"
import { moneyScreen } from '../screens/moneyScreen.js'
import { getRefLink } from '../paymodules/getRefLink.js'
import { testNotActivUser } from '../paymodules/testNotActivUser.js'
import { payMetodScreen } from '../screens/payMetodScreen.js'
import { payTrueScreen } from '../screens/payTrueScreen.js'
import { moneyPayScreen } from '../screens/moneyPayScreen.js'
import { payOk } from '../paymodules/payOk.js'
import { payOff } from '../paymodules/payOff.js'
import { moneyTipsScreen } from '../screens/moneyTipsScreen.js'
import { howItWorkScreen } from '../screens/howItWorkScreen.js'
import { myRefUser } from '../paymodules/myRefUsers.js'

export const botCallback = async (bot, appContext) => {
    try{
        bot.on('callback_query', async (ctx) => {
            // console.log(appContext.profiles)
            if(ctx.chat.id == process.env.CONTROLCHAT || ctx.chat.id > 0){
                var startTime = Date.now()
                bot.use(rateLimit(await fix.configLimitUse(appContext)))
                var callback = ctx.update.callback_query.data.split('|')
                if(callback[0] !== 'ttt'){
                    if(!['control', 'uncontrol', 'bun', 'activProfile', 'pay', 'unpay'].includes(callback[0])){
                        var check = true
                        var data = false
                        var user = await getUser(ctx, appContext)
                        if(user.activTime.length == 0 && user.statusUser == true){
                            console.log('old user')
                            user.activTime.push({status: true, time: startTime})
                            await user.updateOne({$addToSet: {activTime: {status: true, time: startTime}}})
                            var mainArRef = user.refStartLink.concat([user.id])
                            await myRefUser(user, mainArRef, 0, 0)
                        }
                        console.log('### cb: ' + ctx.update.callback_query.data + ' <' + ctx.from.id + '> ' + '(' + user.name + ')')
                        await editUserProfile(user, 'lastActiv', startTime)
                        // await editUserProfile(user, 'like', [])
                        await editUserProfile(user, 'upDateField', 'empty')
                        if(user.heartsUpTime + fix.timeForUpdateLike < startTime){
                            await editUserProfile(user, 'heartsUpTime', startTime)
                            await editUserProfile(user, 'hearts', fix.likeCount)
                        }
                        if(callback[0] == 'workMode'){
                            if(callback[1] == 'offHowItWork') await editUserProfile(user, 'howItWork', false)
                            await testNotActivUser(user)
                            user.viewProfiles = []
                            await user.updateOne({viewProfiles: []})
                            const friendsArray = await seachFilter(user, appContext.profiles[user.sexFind + user.sex])
                            await editUserProfile(user, 'friendsArray', friendsArray)
                            await editUserProfile(user, 'upDateField', `mainScreen`)
                            data = await mainScreen(user, appContext, friendsArray)
                            if(await testBadMedia(user, appContext) !== ' '){
                                await editUserProfile(user, 'statusUser', false)
                                await deleteUserFromMain(user, appContext.profiles)
                                data = await profileScreen(user, appContext)
                            }
                        }
                        else if(callback[0] == 'nextNoLike'){
                            // user.like.splice(user.like.findIndex(item => item == Number(callback[1])), 1)
                            // await user.updateOne({
                            //     $pull: {like: Number(callback[1])},
                            //     $inc: {payInApp: fix.costNoLike},
                            //     $push: {historyPayment: {time: Date.now(), metod: 'inApp', count: fix.costNoLike, action: 'nextNoLike', status: true, worker: user.name}}
                            // })
                            // user.payInApp = user.payInApp + fix.costNoLike
                            await testNotActivUser(user)
                            await editUserProfile(user, 'upDateField', `mainScreen`)
                            data = await mainScreen(user, appContext, user.friendsArray)
                            if(await testBadMedia(user, appContext) !== ' '){
                                await editUserProfile(user, 'statusUser', false)
                                await deleteUserFromMain(user, appContext.profiles)
                                data = await profileScreen(user, appContext)
                            }
                        }
                        else if(callback[0] == 'nextLike'){
                            if(callback[2] == 'payLike'){
                                await user.updateOne({
                                    $inc: {payInApp: fix.costLike},
                                    $push: {historyPayment: {time: Date.now(), metod: 'inApp', count: fix.costLike, action: 'nextLike', status: true, worker: user.name}}
                                })
                                user.payInApp = user.payInApp + fix.costLike
                            }
                            await testNotActivUser(user)
                            await editUserProfile(user, 'hearts', await heartMinus(user))
                            var love = await testLikePartner(user, callback[1], appContext)
                            if(love){
                                data = await loveScreen(user, appContext, callback[1])
                            }
                            else{
                                await editUserProfile(user, 'upDateField', `mainScreen`)
                                data = await mainScreen(user, appContext, user.friendsArray)
                            }
                            await pushUserProfile(user, 'like', callback[1])
                            if(await testBadMedia(user, appContext) !== ' '){
                                await editUserProfile(user, 'statusUser', false)
                                await deleteUserFromMain(user, appContext.profiles)
                                data = await profileScreen(user, appContext)
                            } 
                        }
                        else if(callback[0] == 'zeroLike'){
                            await testNotActivUser(user)
                            await editUserProfile(user, 'upDateField', `mainScreen`)
                            data = await mainScreen(user, appContext, user.friendsArray)
                            if(await testBadMedia(user, appContext) !== ' '){
                                await editUserProfile(user, 'statusUser', false)
                                await deleteUserFromMain(user, appContext.profiles)
                                data = await profileScreen(user, appContext)
                            } 
                        }
                        else if(callback[0] == 'proccessOk'){
                            await editUserProfile(user, 'have18years', true)
                            if(['year', 'mounth', 'day', 'name', 'sex', 'sexFind'].includes(callback[2])){
                                await editUserProfile(user, callback[2], callback[3])
                                data = await calendarScreen(user, callback[1], appContext, ctx) 
                            }
                            else if(['onPay'].includes(callback[1])){
                                await editUserProfile(user, 'onPay', true)
                                data = await payMetodScreen(user, appContext) 
                            }
                            else if(['offPay'].includes(callback[1])){
                                await editUserProfile(user, 'onPay', false)
                                data = await payMetodScreen(user, appContext) 
                            }
                            else{
                                data = await calendarScreen(user, callback[1], appContext, ctx)
                            }
                        }
                        else if(callback[0] == 'filter'){
                            data = await filterScreen(user, appContext, callback) 
                        }
                        else if(callback[0] == 'proccessOff'){
                            await editUserProfile(user, 'have18years', false)
                            await editUserProfile(user, 'block', true)
                            await pushUserProfile(appContext.adminData, 'blockUsers', user.id)
                            data = await blokScreen(user, appContext)
                        }
                        else if(callback[0] == 'toStartMenu'){
                            data = await startScreenLeng(user, appContext, callback[1])
                        }
                        else if(callback[0] == 'myProfile'){
                            if(callback[1] == 'tips'){
                                if(user.help) await editUserProfile(user, 'help', false)
                                else await editUserProfile(user, 'help', true)
                            }
                            else{
                                await editUserProfile(user, 'help', false)
                            }
                            data = await profileScreen(user, appContext)
                        }
                        else if(callback[0] == 'off'){
                            await deleteUserFromMain(user, appContext.profiles)
                            await editUserProfile(user, 'statusUser', false)
                            data = await profileScreen(user, appContext)
                        }
                        else if(callback[0] == 'lenguage'){
                            await editUserProfile(user, 'lengCode', callback[1])
                            if(callback[2] == 'start') data = await startScreen(user, appContext)
                            else data = await profileScreen(user, appContext)
                        }
                        else if(callback[0] == 'on'){
                            await editUserProfile(user, 'statusUser', true)
                            data = await profileScreen(user, appContext) 
                        }
                        else if(callback[0] == 'moneyScreen'){
                            await editUserProfile(user, 'startRefPage', Number(callback[1]))
                            data = await moneyScreen(user, appContext, user.startRefPage)
                        }
                        else if(callback[0] == 'moneyTipsScreen'){
                            data = await moneyTipsScreen(user, appContext)
                        }
                        else if(callback[0] == 'payMetodScreen'){
                            data = await payMetodScreen(user, appContext)
                        }
                        else if(callback[0] == 'payTrueScreen'){
                            data = await payTrueScreen(user, appContext, callback[1], Number(callback[2]))
                        }
                        else if(callback[0] == 'moneyPayScreen'){  
                            data = await moneyPayScreen(ctx, user, appContext, callback[1], Number(callback[2]))
                        }
                        else if(callback[0] == 'link'){
                            check = false
                            var mes = await ctx.telegram.sendMessage(user.id, `<b>${appContext.text.moneyWelcom[user.lengCode]}🔗 <a href="${await getRefLink(user)}">Rita</a></b>\n\n${appContext.text.forwardLink[user.lengCode]}\n<code>${await getRefLink(user)}</code>`, {disable_web_page_preview: true, parse_mode: 'HTML'}).catch(fix.errorDone)
                            setTimeout(async () => {
                                await ctx.telegram.deleteMessage(user.id, mes.message_id).catch(fix.errorDone)
                            }, 5000)
                        }
                        else if(callback[0] == 'dialogsArhiv'){
                            await testNotActivUser(user)
                            await editUserProfile(user, 'deleteDialogReqest', false)
                            if(user.dialoges.length == 0){
                                await editUserProfile(user, 'upDateField', `mainScreen`)
                                data = await mainScreen(user, appContext, user.currentUser)
                                if(await testBadMedia(user, appContext) !== ' '){
                                    await editUserProfile(user, 'statusUser', false)
                                    await deleteUserFromMain(user, appContext.profiles)
                                    data = await profileScreen(user, appContext)
                                }
                            }
                            else if(user.dialoges.length == 1){
                                if(callback[1] == 'one'){
                                    await editUserProfile(user, 'upDateField', `mainScreen`)
                                    data = await mainScreen(user, appContext, user.currentUser)
                                }
                                else{
                                    var testAvelibleDialog = await testAvalibleDialog(user, user.dialoges[0].idDialog)
                                    if(testAvelibleDialog){
                                        await editUserProfile(user, 'upDateField', `dialog|${testAvelibleDialog.partner.id}|${testAvelibleDialog.dialog._id}`)
                                        await updateObjectDialog(user, testAvelibleDialog.dialog, false)
                                        data = await dialogScreen(user, testAvelibleDialog.dialog, testAvelibleDialog.partner, appContext)  
                                    }
                                    else{
                                        await editUserProfile(user, 'upDateField', `messegesScreen`)
                                        data = await messegesScreen(user, appContext)
                                    }
                                }
                            }
                            else{
                                await editUserProfile(user, 'upDateField', `messegesScreen`)
                                data = await messegesScreen(user, appContext)
                            }
                        }
                        else if(callback[0] == 'dialog'){
                            await editUserProfile(user, 'deleteDialogReqest', false)
                            await testNotActivUser(user)
                            var testAvelibleDialog = await testAvalibleDialog(user, callback[1])
                            if(testAvelibleDialog){
                                await editUserProfile(user, 'upDateField', `dialog|${testAvelibleDialog.partner.id}|${testAvelibleDialog.dialog._id}`)
                                await updateObjectDialog(user, testAvelibleDialog.dialog, false)
                                data = await dialogScreen(user, testAvelibleDialog.dialog, testAvelibleDialog.partner, appContext)  
                            }
                            else if(user.dialoges.length == 0){
                                await editUserProfile(user, 'upDateField', `mainScreen`)
                                data = await mainScreen(user, appContext, user.currentUser)
                                if(await testBadMedia(user, appContext) !== ' '){
                                    await editUserProfile(user, 'statusUser', false)
                                    await deleteUserFromMain(user, appContext.profiles)
                                    data = await profileScreen(user, appContext)
                                }
                            }
                            else{
                                await editUserProfile(user, 'upDateField', `messegesScreen`)
                                data = await messegesScreen(user, appContext)
                            }
                        }
                        else if(callback[0] == 'deleteDialog'){
                            var testAvelibleDialog = await testAvalibleDialog(user, callback[1])
                            if(testAvelibleDialog){
                                check = false
                                if(user.deleteDialogReqest){
                                    await deleteDialog(user, testAvelibleDialog.dialog, testAvelibleDialog.partner, appContext, ctx)
                                    check = true
                                    await editUserProfile(user, 'upDateField', `messegesScreen`)
                                    data = await messegesScreen(user, appContext)
                                }
                                else{
                                    await editUserProfile(user, 'deleteDialogReqest', true)
                                    await updateUserMongo(user)
                                    await ctx.answerCbQuery(appContext.text.delDialogConfirm[user.lengCode], {show_alert: true})
                                }
                            }
                            else{
                                await editUserProfile(user, 'upDateField', `messegesScreen`)
                                data = await messegesScreen(user, appContext)
                            } 
                        }
                        else if(callback[0] == 'deleteProfile'){
                            check = false
                            if(user.deleteReqest){
                                await deleteProfile(ctx, user, appContext) 
                            }
                            else{
                                await editUserProfile(user, 'deleteReqest', true)
                                await updateUserMongo(user)
                                await ctx.answerCbQuery(appContext.text.reqestDelete[user.lengCode], {show_alert: true})
                            }
                        }
                        else if(callback[0] == 'city'){
                            await editUserProfile(user, 'city', callback[1])
                            data = await profileScreen(user, appContext)
                        }
                        else if(callback[0] == 'howItWorkScreen'){
                            data = await howItWorkScreen(user, appContext) 
                        }
                        if(check){
                            if(data == false){
                                data = await errorScreen(user, appContext)
                            }
                            await updateUserMongo(user)
                            await editTopDown(ctx, user, data)
                        }
                    }
                    else{
                        if(callback[0] == 'control'){
                            var mediaPhotoOrVideo
                            if(ctx.update.callback_query.message['photo'] !== "undefined"){
                                mediaPhotoOrVideo = ctx.update.callback_query.message.photo[0].file_unique_id
                            }
                            else{
                                mediaPhotoOrVideo = ctx.update.callback_query.message.video.file_unique_id
                            }
                            await controlAdd(ctx, callback[1], mediaPhotoOrVideo, appContext)
                        }
                        else if(callback[0] == 'uncontrol'){
                            var mediaPhotoOrVideo
                            if(ctx.update.callback_query.message['photo'] !== "undefined"){
                                mediaPhotoOrVideo = ctx.update.callback_query.message.photo[0].file_unique_id
                            }
                            else{
                                mediaPhotoOrVideo = ctx.update.callback_query.message.video.file_unique_id
                            }
                            await controlStop(ctx, callback[1], mediaPhotoOrVideo, appContext)
                        }
                        else if(callback[0] == 'bun'){
                            await bunUser(ctx, callback[1], appContext)
                        }
                        else if(callback[0] == 'pay'){
                            await payOk(ctx, callback[1], Number(callback[2]), callback[3])
                        }
                        else if(callback[0] == 'unpay'){
                            await payOff(ctx, callback[1], Number(callback[2]), callback[3])
                        }
                        else if(callback[0] == 'activProfile'){
                            var profile = await User.findOneAndUpdate({id: callback[1]}, {block: false, statusAdmin: true}, {returnDocument: 'after'})
                            if(profile){
                                appContext.adminData.blockUsers.splice(appContext.adminData.blockUsers.findIndex(item => item == callback[1]), 1)
                                await appContext.adminData.updateOne({blockUsers: appContext.adminData.blockUsers})
                                if(profile.botActiv){
                                    var data = await startScreen(profile, appContext)
                                    var newCtx = {
                                        telegram: ctx.telegram,
                                            from:{
                                                id: profile.id
                                            }
                                    }
                                    await editDown(newCtx, profile, data)
                                }
                                var chat = ctx.update.callback_query.message.chat.id
                                var message = ctx.update.callback_query.message.message_id
                                var keyboard = {inline_keyboard: [[{ text: 'Done', callback_data: 'ttt'}]]}
                                await ctx.telegram.editMessageReplyMarkup(chat, message, 'q', {...keyboard, ...fix.optionForMessages}).catch(fix.errorDone)
                            }
                            else{
                                var chat = ctx.update.callback_query.message.chat.id
                                var message = ctx.update.callback_query.message.message_id
                                var keyboard = {inline_keyboard: [[{ text: 'USER NOT FOUND', callback_data: 'ttt'}]]}
                                await ctx.telegram.editMessageReplyMarkup(chat, message, 'q', {...keyboard, ...fix.optionForMessages}).catch(fix.errorDone)
                            }
                        }
                    }
                }
                ctx.answerCbQuery()
                fix.timeForDoneFunc(startTime, `botCallback`)
            }
            else{
                console.log('not bot activ', 'botCallback')
            } 
        })
    }
    catch(error){
        fix.errorModuleConsole(error, 'botCallback')
    }
}
