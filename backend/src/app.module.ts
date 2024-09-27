import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { NodeEnv } from '@common/enums';
import AppConfig from '@config/appConfig';
import { Foundation } from '@modules/foundation/schema/foundation.entity';
import { GrantModule } from '@modules/grant/grant.module';
import { GrantUserInteraction } from '@modules/grant/schema/grant-user-interaction.entity';
import { Grant } from '@modules/grant/schema/grant.entity';
import { User } from '@modules/user/schema/user.entity';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from '@seed/seed.service';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<AppConfig>) => ({
        type: 'postgres',
        host: configService.getOrThrow('postgresHost'),
        port: 5432,
        username: configService.getOrThrow('postgresUser'),
        password: configService.getOrThrow('postgresPwd'),
        database: configService.getOrThrow('postgresDB'),
        entities: [User, Grant, Foundation, GrantUserInteraction],
        // Development environment configurations
        ...(
          configService.getOrThrow('nodeEnv') === NodeEnv.Development &&
          { synchronize: true }
        ),
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([User, Grant, Foundation, GrantUserInteraction]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/common/graphql-typings.generated.ts')
      },

      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    }),
    GrantModule,
  ],
  providers: [SeedService],
})
export class AppModule { }
