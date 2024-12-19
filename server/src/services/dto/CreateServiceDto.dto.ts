import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly name: string
}


