import { IsNotEmpty, IsString, Length } from 'class-validator'

export class ChangeServiceDataDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly newData: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly serviceId: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly subServiceId: string
}


