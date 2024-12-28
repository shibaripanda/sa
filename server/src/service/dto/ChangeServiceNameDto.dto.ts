import { IsNotEmpty, IsString, Length } from 'class-validator'

export class ChangeServiceNameDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly newName: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly serviceId: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly subServiceId: string
}


