import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/entities/posts/posts.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './DTO/createPost.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
    private usersService: UsersService,
  ) {}

  async getPosts() {
    return this.postsRepository
      .createQueryBuilder('post')
      .select([
        'post.id',
        'post.title',
        'post.description',
        'post.content',
        'post.createdAt',
      ])
      .leftJoin('post.user', 'user')
      .addSelect(['user.id', 'user.firstName', 'user.lastName'])
      .getMany();
  }

  async getPostById(postId: string) {
    return this.postsRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id: postId })
      .leftJoin('post.user', 'user')
      .addSelect(['user.id', 'user.firstName', 'user.lastName'])
      .getOne();
  }

  async createPost(createPostDto: CreatePostDto, email: string) {
    const userByEmail = await this.usersService.getUserByEmail(email);
    const newPost = new Posts();
    newPost.user = userByEmail;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user, ...post } = await this.postsRepository.save(
      Object.assign(newPost, createPostDto),
    );
    return post;
  }
}
