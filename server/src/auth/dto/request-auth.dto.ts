import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class ReqestAuthDto {
    @IsNotEmpty()
    @IsEmail()
    @Length(1, 50)
    readonly email: string

    readonly leng?: string

    readonly authCode?: number
}
