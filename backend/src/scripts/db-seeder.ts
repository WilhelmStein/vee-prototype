import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { SeedService } from '@seed/seed.service';

const bootstrap = async () => {
  try {
    const app = await NestFactory.createApplicationContext(AppModule);
    const seedService = app.get(SeedService);

    await seedService.seed(); // Call your seeding method
    console.log('Seeding completed successfully 🌹.');
    app.close();
  } catch (error) {
    console.error('Seeding failed 🥀:\n\t', error);
  }
};

bootstrap();
