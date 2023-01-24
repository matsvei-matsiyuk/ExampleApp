import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/entities/posts/posts.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PostsController],
  imports: [TypeOrmModule.forFeature([Posts]), UsersModule],
  providers: [PostsService],
})
export class PostsModule {}
