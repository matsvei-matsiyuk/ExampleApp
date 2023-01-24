import {
  Controller,
  Get,
  Post,
  Param,
  Req,
  Body,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreatePostDto } from './DTO/createPost.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/list')
  async getPosts() {
    return this.postsService.getPosts();
  }

  @Get('/:postId')
  async getPost(@Param('postId') postId: string) {
    return this.postsService.getPostById(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createPost(@Req() req, @Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto, req.user.email);
  }
}
