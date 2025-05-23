import { ApiProperty } from '@nestjs/swagger';

export class CreatHistoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  coin: number;

  @ApiProperty()
  quiz: string;

  @ApiProperty()
  createdAt: Date
}


export class GetHistoryDto {
  @ApiProperty()
  user: number;

  @ApiProperty()
  date: string;
}

