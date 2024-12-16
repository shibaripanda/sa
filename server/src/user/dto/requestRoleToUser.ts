import { IsEmail } from 'class-validator'

export class UpdateUserRole {
    @IsEmail()
    readonly email: string
    readonly serviceId: string
    readonly role: string
}


