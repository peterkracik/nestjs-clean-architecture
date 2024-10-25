import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllersModule } from './gateways/controllers/controllers.module';
import { UseCasesModule } from './domain/use-cases/use-cases.module';
import { ProvidersModule } from './providers.module';

@Module({
  imports: [
    ProvidersModule,
    ControllersModule,
    UseCasesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
