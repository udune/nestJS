import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModel } from './posts/entities/user.entity';
import { StudentModel, TeacherModel } from './posts/entities/person.entity';
import {
  AirplaneModel,
  BookModel,
  CarModel,
  ComputeModel,
  SingleBaseModel,
} from './posts/entities/inheritance.entity';
import { ProfileModel } from './posts/entities/profile.entity';
import { PostModel } from './posts/entities/post.entity';
import { TagModel } from './posts/entities/tag.entity';
import { UsersModule } from './users/users.module';
import { UsersModel } from './users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel, ProfileModel, PostModel, TagModel]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'typeormstudy',
      entities: [
        UserModel,
        StudentModel,
        TeacherModel,
        BookModel,
        CarModel,
        SingleBaseModel,
        ComputeModel,
        AirplaneModel,
        ProfileModel,
        PostModel,
        TagModel,
        UsersModel,
      ],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
