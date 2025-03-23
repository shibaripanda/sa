import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserGateway } from './user.gateway';
import { ServicesModule } from 'src/service/services.module';
import { AppModule } from 'src/app/app.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UsersSchema }]), 
    forwardRef(() => AuthModule),
    ServicesModule,
    forwardRef(() => AppModule)
  ],
  providers: [UsersService, UserGateway],
  exports: [UsersService]
})
export class UsersModule {}
