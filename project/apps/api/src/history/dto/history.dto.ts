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
