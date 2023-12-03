import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MysqlConfigProvider implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get('DB_USER_NAME'),
      password: this.configService.get('DB_USER_PASSWORD'),
      database: this.configService.get('DB_SCHEMA'),
      entities: [],
      synchronize: false,
      migrationsTableName: 'migrations',
      migrations: [__dirname + '/entity/*.entity.ts'],
    };
  }
}
