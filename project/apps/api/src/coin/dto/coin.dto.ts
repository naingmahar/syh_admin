import { ApiProperty } from '@nestjs/swagger';

export class CreateCoinDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  user: String;

}
