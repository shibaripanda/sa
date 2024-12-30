import { IsNotEmpty, IsString, Length } from 'class-validator'

export class ChangeServiceStatusDto {
    @IsNotEmpty()
    @IsString()
    readonly status: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly serviceId: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly subServiceId: string
}


