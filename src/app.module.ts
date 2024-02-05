import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { UserController } from './user/user.controller';
import { loggerTestMiddleware } from './middlewares/logger_test.middleware';


@Module({
  imports: [VideoModule, UserModule, ConfigModule.forRoot({
    isGlobal: true
  }), ServeStaticModule.forRoot({
    rootPath: "."
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(loggerMiddleware).forRoutes(UserController);
    consumer.apply(loggerTestMiddleware).forRoutes(UserController);
  }
}

