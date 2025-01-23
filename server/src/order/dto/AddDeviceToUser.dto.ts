import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class AddDeviceToUser {

    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
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


