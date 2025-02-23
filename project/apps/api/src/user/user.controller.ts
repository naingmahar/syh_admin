import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { IFindUser } from './interface/user';

@Controller('user')
@ApiTags("User")
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    @ApiOperation({ summary: 'Create User' })
    register(@Body() createAdminDto:CreateUserDto) {
      return this.userService.createUser(createAdminDto);
    }

    @Get()
    @ApiOperation({ summary: 'User Login' })
    getUser(@Query() query:IFindUser) {
      return this.userService.findOne(query);
    }
}
