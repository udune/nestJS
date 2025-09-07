import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
// import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './posts/entities/user.entity';
import { Repository } from 'typeorm';

@Controller('users')
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Post()
  postUser() {
    return this.userRepository.save({});
  }

  @Get()
  async getUsers() {
    return this.userRepository.find();
  }

  @Patch(':id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
    });

    return this.userRepository.save({
      ...user,
      title: user?.title + '0',
    });
  }
}
