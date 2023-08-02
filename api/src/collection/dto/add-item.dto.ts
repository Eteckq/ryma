import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';


export class AddItemDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @Type(() => Number)
    @IsNumber()
    rarity: number;

    @ApiProperty()
    @IsString()
    design: string;
}
