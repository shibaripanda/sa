import { IsEmail } from 'class-validator'

export class ReqestUserByEmailDto {
    @IsEmail()
    readonly email: string
}


