import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class AuthDto {

    @IsNotEmpty()
    @IsString()
    readonly demo: string

    @IsNotEmpty()
    @IsString()
    readonly access_token: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string
    
}