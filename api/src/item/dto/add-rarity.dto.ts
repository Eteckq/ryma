import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class AddRarityDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    color: string;

    @ApiProperty()
    @Transform(({ value }) => {
        return Number(value);
    })
    @IsNumber()
    weight: number;
}
