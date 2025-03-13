import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constant';
import { join } from 'path/posix';
import { UserService } from './user/user.service';
import { User, UserSchema } from './schemas/user.schema';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://kingkryptou:0000@dashboard.we9ua.mongodb.net/?retryWrites=true&w=majority&appName=dashboard',
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService, JwtStrategy],
})
export class AppModule {}
