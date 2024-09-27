import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import AppConfig from '@config/appConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<AppConfig>);

  const port = parseInt(configService.get('port'), 10);

  await app.listen(port);
  console.log(`Running at port: ${port}`)
}
bootstrap();
