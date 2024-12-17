import { IsEmail, IsNotEmpty } from 'class-validator'
import { ObjectId } from 'mongoose'

export class UpdateUserRoleDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    readonly serviceId: ObjectId

    @IsNotEmpty()
    readonly role: string
}


