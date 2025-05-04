import { ApiProperty } from '@nestjs/swagger';

export class CreatHistoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user: string;

  @ApiProperty()
  helper: string;

  @ApiProperty()
  createdAt: Date
}

