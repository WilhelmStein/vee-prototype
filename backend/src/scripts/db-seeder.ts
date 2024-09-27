import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";
import { SeedService } from "@seed/seed.service";

const bootstrap = async () => {
    const app = await NestFactory.createApplicationContext(AppModule);
    const seedService = app.get(SeedService);

    try {
        await seedService.seed(); // Call your seeding method
        console.log('Seeding completed successfully.');
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await app.close(); // Close the application context
    }
};

bootstrap();
