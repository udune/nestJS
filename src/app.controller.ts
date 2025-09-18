import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
// import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './posts/entities/user.entity';
import {
  Between,
  Equal,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { ProfileModel } from './posts/entities/profile.entity';
import { PostModel } from './posts/entities/post.entity';
import { TagModel } from './posts/entities/tag.entity';

@Controller('users')
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Post('sample')
  async sample() {
    // // 모델에 해당되는 객체 생성 - 저장은 안 함
    // const user1 = this.userRepository.create({
    //   email: 'test@codefactory.ai',
    // });
    // // 저장
    // const user2 = await this.userRepository.save({
    //   email: 'test@codefactory.ai',
    // });
    // preload
    // 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고
    // 추가 입력된 값으로 데이터베이스에서 가져온 값들을 대체함
    // 저장하지는 않음
    // const user3 = await this.userRepository.preload({
    //   id: 101,
    //   email: 'test@codefactory.ai',
    // });
    // // 삭제하기
    // await this.userRepository.delete(101);
    // return user3;
    // 증가
    // await this.userRepository.increment(
    //   {
    //     id: 1,
    //   },
    //   'count',
    //   10,
    // );

    // 감소
    // await this.userRepository.decrement(
    //   {
    //     id: 1,
    //   },
    //   'count',
    //   5,
    // );

    // 갯수 카운팅하기
    // const count = await this.userRepository.count({
    //   where: {
    //     email: ILike('%0%'),
    //   },
    // });

    // const sum = await this.userRepository.sum('count', {
    //   email: ILike('%0%'),
    // });

    // const average = await this.userRepository.average('count', {
    //   email: ILike('%0%'),
    // });

    // const min = await this.userRepository.minimum('count', {
    //   email: ILike('%0%'),
    // });

    // const max = await this.userRepository.maximum('count', {
    //   email: ILike('%0%'),
    // });

    // const users = await this.userRepository.find({});

    // const userOne = await this.userRepository.findOne({
    //   where: { id: 1 },
    // });

    // const usersAndCount = await this.userRepository.findAndCount({
    //   take: 3,
    // });

    return {};
  }

  @Post()
  async postUser() {
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `user-${i}@example.com`,
      });
    }
  }

  @Get()
  async getUsers() {
    return this.userRepository.find({
      order: {
        id: 'ASC',
      },
      where: {
        // 1이 아닌 모든 유저
        // id: Not(1),
        // 30보다 작은 모든 유저
        // id: LessThan(30),
        // 30이하인 모든 유저
        // id: LessThanOrEqual(30),
        // 30보다 큰 모든 유저
        // id: MoreThan(30),
        // 30이상인 모든 유저
        // id: MoreThanOrEqual(30),
        // 30인 모든 유저
        // id: Equal(30),
        // 유사값
        // email: Like('%google%'),
        // 대소문자 구분 없는 유사값
        // email: ILike('%GOOGLE%'),
        // 10부터 20까지 모든 유저
        // id: Between(10, 20),
        // 1,10,20,30,40,50인 모든 유저
        // id: In([1, 10, 20, 30, 40, 50]),
        // ID가 null인 모든 유저
        id: IsNull(),
      },
      // 어떤 프로퍼티를 선택할지
      // 기본은 모든 프로퍼티를 가져온다
      // 만약에 select를 정의하지 않으면
      // select가 false인 프로퍼티는 가져오지 않는다.
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        // profile: true,
      },
      // 필터링할 조건을 입력하게 된다.
      // 오름차 내림차 정렬
      // order: {
      //   createdAt: 'DESC',
      // },
      // 몇 개의 데이터를 가져올지
      // take: 2,
      // 몇 개의 데이터를 건너 뛸지
      // skip: 1,
      // relations: ['profile'], // profile 프로퍼티에 있는 모든 정보를 가져온다.
      // relations: {
    });
  }

  @Patch(':id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
    });

    return this.userRepository.save({
      ...user,
      email: user?.email + '0',
    });
  }

  @Post('user/profile')
  async createUserProfile() {
    const user = await this.userRepository.save({
      email: 'test@example.com',
    });

    const profile = await this.profileRepository.save({
      profileImg: 'http://example.com/profile.png',
      user: user,
    });

    return profile;
  }

  @Post('user/post')
  async createUserAndPosts() {
    const user = await this.userRepository.save({
      email: 'test@example.com',
      profile: {
        profileImg: 'http://example.com/profile.png',
      },
    });

    // await this.postRepository.save({
    //   author: user,
    //   title: 'post 1',
    // });

    // await this.postRepository.save({
    //   author: user,
    //   title: 'post 2',
    // });

    return user;
  }

  @Post('posts/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'NestJS Lecture',
    });

    const post2 = await this.postRepository.save({
      title: 'Programming Lecture',
    });

    const tag1 = await this.tagRepository.save({
      name: 'JavaScript',
      posts: [post1, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'TypeScript',
      posts: [post1],
    });

    await this.postRepository.save({
      title: 'NextJS Lecture',
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get('posts')
  async getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  async getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileRepository.delete(Number(id));
    return true;
  }
}
