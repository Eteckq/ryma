import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';


export class AddItemDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    @Max(3)
    @IsNotEmpty()
    rarity: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    design: string;
}
