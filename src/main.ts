import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // Enable CORS with custom options
  app.enableCors({
    origin: ['https://front-end-react-tau.vercel.app'], // Allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow credentials (e.g., cookies)
    allowedHeaders: 'Content-Type, Accept', // Allowed headers
});
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
