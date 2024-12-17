import { IsEmail, IsNotEmpty } from 'class-validator'

export class ReqestAuthDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string
    readonly leng?: string
    readonly authCode?: number
}
