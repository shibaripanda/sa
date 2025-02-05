import { IsNotEmpty, IsString, Length } from 'class-validator'

export class ChangeServiceColorStatusDto {
    @IsNotEmpty()
    @IsString()
    readonly status: string

    @IsNotEmpty()
    @IsString()
    readonly color: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly serviceId: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly subServiceId: string
}


