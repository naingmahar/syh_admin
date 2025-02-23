import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  device_id: string

  @ApiProperty()
  device_info: string

  @ApiProperty()
  device_name: string

  @ApiProperty({nullable:true})
  phone?: string

  @ApiProperty({nullable:true})
  password?: string

  @ApiProperty({nullable:true})
  user_image?: string

  @ApiProperty({nullable:true})
  nrc?: string

  @ApiProperty({nullable:true})
  dob: string
}
