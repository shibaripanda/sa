import { IsArray, IsNotEmpty, IsString, Length } from 'class-validator'

export class ChangeServiceRoleDto {
    @IsNotEmpty()
    @IsString()
    readonly role: string

    @IsNotEmpty()
    @IsArray()
    readonly access: string[]

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly serviceId: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly subServiceId: string
}


