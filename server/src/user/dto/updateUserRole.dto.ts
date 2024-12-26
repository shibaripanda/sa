import { IsEmail, IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator'

export class UpdateUserRoleDto {
    @IsNotEmpty()
    @IsEmail()
    @Length(1, 100)
    readonly email: string

    @IsNotEmpty()
    @IsMongoId()
    @Length(1, 50)
    readonly serviceId: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly role: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly subServiceId: string
}


