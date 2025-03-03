import { ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Injectable, Request, UseGuards, UsePipes } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { WSValidationPipe } from 'src/modules/wsPipeValid'
import { RolesGuard } from 'src/auth/roles.guard'
import { BotService } from './bot.service'
import { Ctx, On, Start, Update } from 'nestjs-telegraf'

@WebSocketGateway({cors:{origin:'*'}})
@Update()
@Injectable()
export class BotGateway {

  constructor(
      private botService: BotService
    ) {}

  @WebSocketServer() server: Server

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @UsePipes(new WSValidationPipe())
  @SubscribeMessage('testTelegram')
  async testTelegram(@ConnectedSocket() client: Socket, @Request() req: any): Promise<void> {
    await this.botService.testTelegram(req.user.telegramId)
  }

  @On('photo')
  async addNewOrderImages(@Ctx() ctx: any){
    const res = await this.botService.addNewOrderImages(ctx.from.id, ctx.message.photo[1].file_id)
    if(res){
      this.server.to(ctx.from.id.toString()).emit('alert', {title: 'dfdfd', message: 'dfdfdf', buffer: res})
    }
  }

  @Start()
  async start(@Ctx() ctx: any){
    const res = await this.botService.start(ctx.from.id, ctx.startPayload)
    if(res){
      await ctx.reply('Connect status OK. Exit and login.')
      this.server.to(ctx.from.id.toString()).emit('alert', {title: 'Telegram connect', message: 'Status OK'})
    }
    else{
      await ctx.reply('Connect status BAD')
      this.server.to(ctx.from.id.toString()).emit('alert', {title: 'Telegram connect', message: 'Status BAD'})
    }
  }

}
