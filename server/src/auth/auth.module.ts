import { forwardRef, Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from 'src/user/users.module'
import { JwtModule } from '@nestjs/jwt'
import { BotModule } from 'src/bot/bot.module'
import { AppModule } from 'src/app/app.module'

@Module({
  imports: [
    JwtModule.register({secret: process.env.SECRET_KEY, signOptions: {expiresIn: '1000h'}}),
    // forwardRef(() => UsersModule),
    UsersModule,
    BotModule,
    forwardRef(() => AppModule)
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
