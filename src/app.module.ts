import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { RestaurantResolver } from './restaurants/restaurants.resolver';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { RestaurantService } from './restaurants/restaurant.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.prod',
      //envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      //ignoreEnvFile: process.env.NODE_ENV === 'prod',
      /*validate: config => {
        console.log('Loaded Config: ', config);
        return config;
      },*/
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('DB_HOST'),
        port: configService.getOrThrow<number>('DB_PORT'),
        username: configService.getOrThrow<string>('DB_USERNAME'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.getOrThrow<string>('DB_NAME'),
        synchronize: process.env.NODE_ENV !== 'prod',
        logging: true,
        entities: [Restaurant],
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    RestaurantsModule,
    TypeOrmModule.forFeature([Restaurant]),
  ],
  controllers: [],
  providers: [RestaurantResolver, RestaurantService],
})
export class AppModule {}
