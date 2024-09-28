import { Module } from '@nestjs/common';
import { GrantService } from './grant.service';
import { GrantResolver } from './grant.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grant } from './schema/grant.entity';
import { GrantUserInteraction } from './schema/grant-user-interaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grant, GrantUserInteraction])],
  providers: [GrantService, GrantResolver],
})
export class GrantModule {}
