import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HistoryService } from './history.service';
import { CreatHistoryDto, GetHistoryDto } from './dto/history.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthUser } from 'src/auth/auth.decoder';
import { IAuth } from 'src/auth/type/auth';

@Controller('history')
@ApiTags("history")
@ApiBearerAuth('Authorization')
export class HistoryController {
    constructor(private historyService: HistoryService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Create History' })
    add(@Body() createHistoryDto:CreatHistoryDto, @AuthUser() authUser: IAuth) {
      console.log("authUser",authUser)
      return this.historyService.createHistory(createHistoryDto,authUser.userId.toString());
    }

    @UseGuards(JwtAuthGuard)
    @Get("/today/views")
    @ApiOperation({ summary: 'Get all categories' })
    get(@AuthUser() authUser: IAuth) {
      return this.historyService.getViewCountByDate(String(authUser.userId));
    }

    @UseGuards(JwtAuthGuard)
    @Get("/dashboard")
    @ApiOperation({ summary: 'Get History' })
    // getDashboard(@AuthUser() authUser: IAuth) {
    getDashboard(@AuthUser() authUser: IAuth,@Query() query:GetHistoryDto) {
      return this.historyService.getDshboard(authUser.userId || String(query.user),String(query.date));
    }
}
