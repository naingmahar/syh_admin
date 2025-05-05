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

    @Post("/delete")
    @ApiOperation({ summary: 'Account Delete' })
    accountDelete(@Body() deleteUserDto:{id:number,phone:string}) {
      return this.userService.deleteUser(deleteUserDto.id,deleteUserDto.phone);
    }

    @Get()
    @ApiOperation({ summary: 'User Login' })
    getUser(@Query() query:IFindUser) {
      return this.userService.findOne(query);
    }
}
