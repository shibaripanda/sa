import { IsNotEmpty, IsString, Length } from 'class-validator'

export class AddServiceRoleDto {
    @IsNotEmpty()
    @IsString()
    readonly newRole: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly serviceId: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly subServiceId: string
}


