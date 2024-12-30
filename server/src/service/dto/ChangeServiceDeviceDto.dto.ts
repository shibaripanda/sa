import { IsNotEmpty, IsString, Length } from 'class-validator'

export class ChangeServiceDeviceDto {
    @IsNotEmpty()
    @IsString()
    readonly device: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly serviceId: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly subServiceId: string
}


