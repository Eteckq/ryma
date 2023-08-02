import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt.guard';
import { InjectUser } from './user.decorator';
import { User } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { NeedRole } from './role.decorator';
import { Role } from './role.enum';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    let user = await this.userService.getUser(loginDto);
    if (!user) {
      user = await this.userService.createUser(loginDto)
    }
    return this.authService.createToken(user);
  }

  @Post('logout')
  async logout() {
    return true
  }

  @ApiBearerAuth()
  @NeedRole(Role.User)
  @Get('me')
  async me(@InjectUser() user: User){
    return {user}
  }
}
