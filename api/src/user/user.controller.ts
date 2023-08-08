import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { NeedRole } from 'src/auth/role.decorator';
import { Role } from 'src/auth/role.enum';
import { InjectUser } from 'src/auth/user.decorator';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @NeedRole(Role.User)
  @Get('rpg')
  async getRpgData(@InjectUser() user: User) {
    return this.userService.getRpgData(user);
  }

  @ApiBearerAuth()
  @NeedRole(Role.User)
  @Post('rpg')
  async saveRpgData(@InjectUser() user: User, @Body('data') data: string) {
    return this.userService.saveRpgData(user, data);
  }
}
