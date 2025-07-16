import { Module } from '@nestjs/common';
import { SendMailerModule } from './mailer/mailer.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [SendMailerModule,
    ConfigModule.forRoot({
      isGlobal: true, // hace que esté disponible en todos los módulos
    }), 
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get<string>('REDIS_HOST', 'localhost'),
          port: config.get<number>('REDIS_PORT', 6379),
        },
      }),
    }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
