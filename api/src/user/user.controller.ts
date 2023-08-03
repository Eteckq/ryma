import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { NeedRole } from 'src/auth/role.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get('items/:id')
  async getItemsForUser(@Param('id') userId: string){
    return this.userService.getItemsForUser(userId)
  }

}
