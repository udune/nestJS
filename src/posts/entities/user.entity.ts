import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  VersionColumn,
  Generated,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { ProfileModel } from './profile.entity';
import { PostModel } from './post.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  // ID
  // 자동으로 ID를 생성한다.
  // @PrimaryGeneratedColumn()을 사용하면 자동으로 ID가 생성된다.
  // PrimaryColumn은 테이블에서 기본적으로 존재해야 한다.
  // 테이블 안에서 각각의 Row를 구분하는 기준이 된다.
  // PrimaryGeneratedColumn => 1, 2, 3, 4, 5 ...
  // UUID => 'asdasdasd-asdasdasd-asdasdasd-asdasdasd'
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  // // 제목
  // @Column({
  //   // 데이터베이스에서 인지하는 컬럼 타입
  //   // 자동으로 유추됨
  //   type: 'varchar',
  //   // 데이터베이스 컬럼 이름
  //   // 프로퍼티 이름으로 자동 유추됨
  //   name: 'title',
  //   // 값의 길이
  //   // 입력할 수 있는 글자의 길이가 300
  //   length: 300,
  //   // null 허용 여부
  //   nullable: true,
  //   // true면 처음 지정할때만 값 지정 가능
  //   // 이후에는 값 변경 불가능
  //   update: false,
  //   // find()를 실행할때 기본으로 값을 불러올지
  //   //기본값이 true
  //   select: false,
  //   // 기본값
  //   // 아무것도 입력 안 했을때 기본값
  //   default: 'default title',
  //   // 고유한 값인지 여부
  //   // 기본값은 false
  //   unique: false,
  // })
  // title: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  // 데이터 생성 일자
  @CreateDateColumn()
  createdAt: Date;

  // 데이터 수정 일자
  @UpdateDateColumn()
  updatedAt: Date;

  // 데이터가 업데이트 될때마다 1씩 증가한다.
  // 처음 생성되면 값은 1이다.
  // save() 메서드를 사용할 때마다 값이 1씩 증가한다.
  @VersionColumn()
  version: number;

  @Column()
  @Generated('uuid')
  additionalId: string;

  @OneToOne(() => ProfileModel, (profile) => profile.user)
  profile: ProfileModel;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];
}
