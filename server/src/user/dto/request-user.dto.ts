import { IsEmail, Length } from 'class-validator'

export class ReqestUserByEmailDto {
    @IsEmail()
    @Length(1, 50)
    readonly email: string
}


