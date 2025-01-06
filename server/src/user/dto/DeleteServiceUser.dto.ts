import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class DeleteServiceUser {

    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly serviceId: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly subServiceId: string
}


